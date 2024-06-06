<script setup lang="ts">
import { ref } from 'vue'
import { VueCollapsiblePanelGroup, VueCollapsiblePanel } from '@dafcoe/vue-collapsible-panel'

definePageMeta({
  title: 'Help & FAQs',
  description: `We're Here to Help: Your Support Hub!`,
  navOrder: '12',
  type: 'secondary',
  icon: 'i-mdi-home',
})

const faqs = ref([
  {
    question: '¿QUIENES SOMOS?',
    answer: 'Somos una empresa 100% mexicana de base tecnológica, que coordina grupos de personas con un mismo interés y destino, las connectamos con empresas de transporte turístico para la prestación de los servicios de traslado. En CONNECTANDO, cuidamos que todas las unidades afiliadas a la plataforma cuenten con un mismo estándar de calidad y servicio, ofreciendo cobertura de seguro de viajero, unidades de 18 pasajeros equipadas con A/C, sistema de entretenimiento durante el trayecto y conductores capacitados que harán de su viaje la mejor experiencia.',
    isOpen: false
  },
  {
    question: '¿CÓMO RESERVO? (¿Necesito registrarme para reservar?)',
    answer: 'Somos una empresa 100% mexicana de base tecnológica, que coordina grupos de personas con un mismo interés y destino, las connectamos con empresas de transporte turístico para la prestación de los servicios de traslado. En CONNECTANDO, cuidamos que todas las unidades afiliadas a la plataforma cuenten con un mismo estándar de calidad y servicio, ofreciendo cobertura de seguro de viajero, unidades de 18 pasajeros equipadas con A/C, sistema de entretenimiento durante el trayecto y conductores capacitados que harán de su viaje la mejor experiencia.',
    isOpen: false
  },
  {
    question: 'EQUIPAJE PERMITIDO Y EXTRA EQUIPAJE',
    answer: 'Somos una empresa 100% mexicana de base tecnológica, que coordina grupos de personas con un mismo interés y destino, las connectamos con empresas de transporte turístico para la prestación de los servicios de traslado. En CONNECTANDO, cuidamos que todas las unidades afiliadas a la plataforma cuenten con un mismo estándar de calidad y servicio, ofreciendo cobertura de seguro de viajero, unidades de 18 pasajeros equipadas con A/C, sistema de entretenimiento durante el trayecto y conductores capacitados que harán de su viaje la mejor experiencia.',
    isOpen: false
  },
  {
    question: 'VIAJE CON MASCOTAS',
    answer: 'Somos una empresa 100% mexicana de base tecnológica, que coordina grupos de personas con un mismo interés y destino, las connectamos con empresas de transporte turístico para la prestación de los servicios de traslado. En CONNECTANDO, cuidamos que todas las unidades afiliadas a la plataforma cuenten con un mismo estándar de calidad y servicio, ofreciendo cobertura de seguro de viajero, unidades de 18 pasajeros equipadas con A/C, sistema de entretenimiento durante el trayecto y conductores capacitados que harán de su viaje la mejor experiencia.',
    isOpen: false
  },
  // puedes agregar más preguntas y respuestas aquí
])
</script>

<template>
  <div style="
      min-height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    ">
    <VueCollapsiblePanelGroup>
      <VueCollapsiblePanel v-for="(faq, index) in faqs" :key="index" v-model="faq.isOpen">
        <!-- Vincula v-model a faq.isOpen -->
        <template #title>
          {{ faq.question }}
        </template>
        <template #content>
          {{ faq.answer }}
        </template>
      </VueCollapsiblePanel>
    </VueCollapsiblePanelGroup>
  </div>
</template>


<style scoped>
.VueCollapsiblePanelGroup {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Agrega sombra alrededor del panel */
}

.VueCollapsiblePanel {
  border-bottom: 1px solid #eaeaea;
}

.VueCollapsiblePanel:last-child {
  border-bottom: none;
}

.VueCollapsiblePanel .title {
  padding: 16px;
  background-color: #f9f9f9;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Agrega transición suave al cambiar el color de fondo */
}

.VueCollapsiblePanel .title:hover {
  background-color: #f5f5f5; /* Cambia el color de fondo al pasar el mouse */
}

.VueCollapsiblePanel .content {
  padding: 16px;
  background-color: #fff;
  line-height: 1.6; /* Aumenta el espacio entre líneas para mejorar la legibilidad */
}
</style>

