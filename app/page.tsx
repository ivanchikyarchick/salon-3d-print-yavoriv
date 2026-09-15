"use client";

import { useState } from "react";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { ServicesBento } from "@/components/landing/services-bento";
import { MaterialsMatrix } from "@/components/landing/materials-matrix";
import { Calculator } from "@/components/landing/calculator";
import { WorkflowStepper } from "@/components/landing/workflow-stepper";
import { WorkshopYavoriv } from "@/components/landing/workshop-yavoriv";
import { FaqSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";
import { OrderModal } from "@/components/landing/order-modal";

interface ModalData {
  taskType?: string;
  material?: string;
  sizeCategory?: string;
  weightGrams?: number;
  pricePerGram?: number;
  quantity?: number;
  estimatedPrice?: number;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<ModalData | null>(null);

  const handleOpenModal = (serviceName?: string) => {
    setModalInitialData(serviceName ? { taskType: serviceName } : null);
    setIsModalOpen(true);
  };

  const handleSelectMaterial = (materialName: string) => {
    setModalInitialData({ material: materialName });
    setIsModalOpen(true);
  };

  const handleOpenModalWithCalcData = (calcData: ModalData) => {
    setModalInitialData(calcData);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* Navigation Header */}
      <Header onOpenOrderModal={() => handleOpenModal()} />

      {/* Main Content Sections */}
      <main>
        {/* Clean Light Hero */}
        <Hero onOpenOrderModal={() => handleOpenModal()} />

        {/* Core Services */}
        <ServicesBento onOpenOrderModal={handleOpenModal} />

        {/* 4 Key Materials */}
        <MaterialsMatrix onSelectMaterialForOrder={handleSelectMaterial} />

        {/* Simple Price Calculator */}
        <Calculator onOpenOrderModalWithData={handleOpenModalWithCalcData} />

        {/* 3 Step Process */}
        <WorkflowStepper />

        {/* Workshop in Yavoriv */}
        <WorkshopYavoriv onOpenOrderModal={() => handleOpenModal()} />

        {/* FAQ Accordion */}
        <FaqSection />
      </main>

      {/* Clean Footer */}
      <Footer />

      {/* Order Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={modalInitialData}
      />
    </div>
  );
}
