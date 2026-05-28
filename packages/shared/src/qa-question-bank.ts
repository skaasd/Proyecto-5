export type SeedConceptDefinition = {
  slug: string;
  name: string;
};

export type SeedQuestionDefinition = {
  id: string;
  conceptSlugs: string[];
  prompt: string;
  explanation: string;
  correct: string;
  distractors: [string, string];
};

export const conceptBank: SeedConceptDefinition[] = [
  { slug: "regresion", name: "Pruebas de regresion" },
  { slug: "humo", name: "Pruebas de humo" },
  { slug: "exploratorias", name: "Pruebas exploratorias" },
  { slug: "cobertura", name: "Cobertura de pruebas" },
  { slug: "riesgo", name: "Riesgo de producto" },
  { slug: "criterios-aceptacion", name: "Criterios de aceptacion" },
  { slug: "casos-prueba", name: "Diseno de casos de prueba" },
  { slug: "datos-prueba", name: "Datos de prueba" },
  { slug: "reporte-bugs", name: "Reporte de bugs" },
  { slug: "severidad-prioridad", name: "Severidad y prioridad" },
  { slug: "api-testing", name: "Pruebas de API" },
  { slug: "automatizacion", name: "Automatizacion de pruebas" },
  { slug: "ci", name: "Integracion continua" },
  { slug: "flaky-tests", name: "Pruebas inestables" },
  { slug: "performance", name: "Pruebas de rendimiento" },
  { slug: "accesibilidad", name: "Accesibilidad" },
  { slug: "seguridad", name: "Pruebas de seguridad" },
  { slug: "observabilidad", name: "Observabilidad para QA" },
];

export const questionBank: SeedQuestionDefinition[] = [
  {
    id: "question_qa_regression_purpose",
    conceptSlugs: ["regresion", "cobertura"],
    prompt:
      "Despues de corregir un bug en el login, el equipo quiere revisar que el cambio no haya roto flujos que antes funcionaban. Que tipo de prueba describe mejor esa intencion?",
    explanation:
      "Las pruebas de regresion buscan detectar impactos no deseados despues de cambios en el producto.",
    correct: "Prueba de regresion",
    distractors: ["Prueba de humo", "Prueba de carga"],
  },
  {
    id: "question_qa_smoke_release",
    conceptSlugs: ["humo", "riesgo"],
    prompt:
      "Antes de invertir horas en una suite completa, quieres saber si la nueva build permite iniciar sesion, navegar y crear un registro basico. Que enfoque calza mejor?",
    explanation:
      "Las pruebas de humo dan una senal rapida sobre si una build merece revision mas profunda.",
    correct: "Ejecutar una prueba de humo",
    distractors: [
      "Hacer solo pruebas exploratorias largas",
      "Saltar validaciones hasta produccion",
    ],
  },
  {
    id: "question_qa_exploratory_value",
    conceptSlugs: ["exploratorias", "cobertura"],
    prompt:
      "Un flujo nuevo no tiene casos documentados todavia, pero ya existe una version navegable. Que aporte especifico pueden tener las pruebas exploratorias?",
    explanation:
      "Las pruebas exploratorias combinan aprendizaje, diseno y ejecucion cuando hay incertidumbre.",
    correct: "Descubrir riesgos y comportamientos no previstos mientras se aprende el flujo",
    distractors: [
      "Reemplazar para siempre cualquier caso de prueba documentado",
      "Validar unicamente colores y tamanos de fuente",
    ],
  },
  {
    id: "question_qa_acceptance_criteria_gap",
    conceptSlugs: ["criterios-aceptacion", "casos-prueba"],
    prompt:
      "Una historia dice: 'como usuario quiero cambiar mi correo'. No explica verificacion, errores ni confirmacion. Cual es el primer movimiento QA mas util?",
    explanation:
      "Cuando una historia es ambigua, QA aporta claridad antes de ejecutar pruebas mecanicas.",
    correct: "Levantar preguntas sobre reglas, errores y confirmacion antes de disenar casos",
    distractors: ["Aprobar la historia porque el texto es corto", "Crear casos al azar"],
  },
  {
    id: "question_qa_boundary_values",
    conceptSlugs: ["casos-prueba", "datos-prueba"],
    prompt: "Un campo acepta montos entre 1 y 100. Que set prueba mejor los bordes?",
    explanation: "Los valores limite suelen revelar errores justo donde cambian las reglas.",
    correct: "0, 1, 100 y 101",
    distractors: ["25, 50 y 75", "Solo 100 porque es el maximo"],
  },
  {
    id: "question_qa_equivalence_partition",
    conceptSlugs: ["casos-prueba", "cobertura"],
    prompt:
      "Un formulario acepta edades de 18 a 65. Si no puedes probar todos los numeros, que tecnica ayuda a elegir pocos casos representativos?",
    explanation: "Las particiones de equivalencia agrupan entradas que deberian comportarse igual.",
    correct: "Particiones de equivalencia",
    distractors: ["Prueba de carga", "Prueba visual solamente"],
  },
  {
    id: "question_qa_bug_report_minimum",
    conceptSlugs: ["reporte-bugs"],
    prompt:
      "Encuentras que el boton Guardar falla solo despues de adjuntar un PDF. Que dato no deberia faltar en el reporte?",
    explanation: "Un buen bug report permite reproducir, dimensionar y priorizar el problema.",
    correct: "Pasos de reproduccion, resultado esperado, resultado actual y archivo usado",
    distractors: ["Solo escribir 'no funciona'", "Marcarlo siempre como critico"],
  },
  {
    id: "question_qa_severity_priority",
    conceptSlugs: ["severidad-prioridad", "riesgo"],
    prompt:
      "Un typo menor aparece en la pagina principal durante una campana masiva. Tecnica y visualmente es leve, pero negocio quiere corregirlo hoy. Como se describe mejor?",
    explanation: "Severidad y prioridad miden cosas distintas: impacto versus urgencia.",
    correct: "Baja severidad, alta prioridad",
    distractors: ["Alta severidad, baja prioridad", "No deberia reportarse"],
  },
  {
    id: "question_qa_api_status_codes",
    conceptSlugs: ["api-testing", "seguridad"],
    prompt:
      "Una API recibe credenciales invalidas. Que validacion esperarias en una prueba basica?",
    explanation: "En API testing importan codigo HTTP, contrato, body y exposicion de informacion.",
    correct: "Que devuelva un codigo de error apropiado y no entregue datos sensibles",
    distractors: ["Que siempre responda 200", "Que ignore el password para mejorar experiencia"],
  },
  {
    id: "question_qa_api_contract",
    conceptSlugs: ["api-testing", "regresion"],
    prompt:
      "El frontend espera que /profile devuelva email como string. Un cambio empieza a devolver email como objeto. Que tipo de riesgo aparece?",
    explanation:
      "Los contratos entre sistemas son parte del producto; romperlos puede fallar aunque el backend compile.",
    correct: "Riesgo de contrato entre frontend y API",
    distractors: ["Solo un problema cosmetico", "Una mejora automatica de rendimiento"],
  },
  {
    id: "question_qa_automation_candidate",
    conceptSlugs: ["automatizacion", "regresion"],
    prompt: "Que caso suele ser mejor candidato para automatizar primero?",
    explanation:
      "La automatizacion rinde mas cuando protege flujos valiosos, repetidos y estables.",
    correct: "Un flujo critico, repetitivo y con reglas relativamente estables",
    distractors: ["Un experimento de UI que cambia todos los dias", "Una validacion que nadie usa"],
  },
  {
    id: "question_qa_automation_not_everything",
    conceptSlugs: ["automatizacion", "riesgo"],
    prompt:
      "El equipo dice: 'automatizamos todo y asi no hacemos QA manual nunca mas'. Que respuesta es mas sensata?",
    explanation: "Automatizar no reemplaza pensar; cambia donde se invierte la energia humana.",
    correct: "Automatizar lo repetible y mantener exploracion humana para riesgos nuevos",
    distractors: ["Automatizar todo elimina todos los bugs", "Rechazar toda automatizacion"],
  },
  {
    id: "question_qa_ci_fast_feedback",
    conceptSlugs: ["ci", "automatizacion"],
    prompt: "Para que aporta ejecutar pruebas automatizadas en integracion continua?",
    explanation: "CI convierte pruebas en feedback frecuente, no en ceremonia al final.",
    correct: "Detectar regresiones rapido cada vez que cambia el codigo",
    distractors: [
      "Evitar escribir criterios de aceptacion",
      "Garantizar que produccion nunca fallara",
    ],
  },
  {
    id: "question_qa_flaky_test_signal",
    conceptSlugs: ["flaky-tests", "ci"],
    prompt:
      "Una prueba falla en CI una de cada cinco veces sin cambios de codigo. Que problema describe mejor?",
    explanation:
      "Las pruebas inestables erosionan confianza porque mezclan senales reales con ruido.",
    correct: "Es una prueba flaky que necesita investigacion",
    distractors: ["Todo el producto falla siempre", "Debe borrarse sin revisar"],
  },
  {
    id: "question_qa_test_data_isolation",
    conceptSlugs: ["datos-prueba", "flaky-tests"],
    prompt:
      "Dos pruebas usan el mismo usuario fijo y a veces se pisan entre si. Que mejora ataca mejor la causa?",
    explanation:
      "Los datos compartidos pueden crear dependencia entre pruebas y resultados intermitentes.",
    correct: "Crear datos aislados o limpiar el estado entre pruebas",
    distractors: ["Aumentar el timeout sin mirar datos", "Ejecutarlas solo manualmente"],
  },
  {
    id: "question_qa_risk_based_testing",
    conceptSlugs: ["riesgo", "cobertura"],
    prompt: "Tienes dos horas para probar una release grande. Que enfoque es mas responsable?",
    explanation: "Cuando el tiempo es limitado, QA debe priorizar por riesgo e impacto.",
    correct: "Priorizar flujos criticos, cambios recientes y areas con historial de fallas",
    distractors: ["Probar pantallas al azar", "No probar nada porque no alcanza para todo"],
  },
  {
    id: "question_qa_coverage_meaning",
    conceptSlugs: ["cobertura", "riesgo"],
    prompt: "Un reporte dice 90% de cobertura automatizada. Que pregunta QA sigue siendo valida?",
    explanation:
      "La cobertura mide alcance, pero no necesariamente calidad de escenarios ni riesgos cubiertos.",
    correct: "Que riesgos importantes cubren realmente esas pruebas?",
    distractors: [
      "Entonces ya no hay bugs posibles",
      "Conviene borrar las pruebas manuales siempre",
    ],
  },
  {
    id: "question_qa_performance_symptom",
    conceptSlugs: ["performance", "observabilidad"],
    prompt:
      "Usuarios reportan que buscar productos demora 12 segundos en hora punta. Que informacion ayuda mas a investigar?",
    explanation:
      "Rendimiento se entiende mejor combinando sintomas de usuario con metricas del sistema.",
    correct: "Tiempos de respuesta, volumen de usuarios, logs y trazas del periodo afectado",
    distractors: ["Solo una captura del buscador", "Cambiar colores del boton buscar"],
  },
  {
    id: "question_qa_accessibility_keyboard",
    conceptSlugs: ["accesibilidad", "casos-prueba"],
    prompt:
      "Quieres revisar accesibilidad basica en un formulario. Que prueba simple aporta una senal temprana?",
    explanation: "La navegacion por teclado revela rapidamente barreras para muchas personas.",
    correct: "Intentar completar el flujo usando solo teclado",
    distractors: ["Mirar solo si la pagina se ve moderna", "Probar unicamente en pantalla grande"],
  },
  {
    id: "question_qa_security_basic",
    conceptSlugs: ["seguridad", "api-testing"],
    prompt:
      "Una ruta /users/{id}/export permite descargar datos de cualquier id sin validar identidad. Que riesgo es?",
    explanation:
      "El control de acceso es una preocupacion de seguridad y privacidad, no solo de backend.",
    correct: "Acceso horizontal indebido a datos de otros usuarios",
    distractors: ["Solo un problema de estilo de URL", "Un caso imposible si existe login"],
  },
  {
    id: "question_qa_logs_for_reproduction",
    conceptSlugs: ["observabilidad", "reporte-bugs"],
    prompt:
      "Un bug ocurre solo en produccion y no logras reproducirlo localmente. Que dato puede acercarte a la causa?",
    explanation:
      "La observabilidad permite investigar lo ocurrido sin depender solo de repetir manualmente.",
    correct: "Request id, timestamp, usuario afectado y logs relacionados",
    distractors: [
      "Esperar a que pase de nuevo sin registrar nada",
      "Cambiar el texto del error al azar",
    ],
  },
  {
    id: "question_qa_mobile_responsive",
    conceptSlugs: ["casos-prueba", "riesgo"],
    prompt:
      "Una compra funciona en desktop, pero la mitad de usuarios compra desde telefono. Que decision de pruebas tiene mas sentido?",
    explanation: "La cobertura debe considerar uso real, no solo comodidad del equipo.",
    correct: "Incluir mobile en flujos criticos de compra",
    distractors: [
      "Probar solo desktop porque es mas rapido",
      "No probar compra porque carga la home",
    ],
  },
  {
    id: "question_qa_negative_testing",
    conceptSlugs: ["casos-prueba", "api-testing"],
    prompt: "Un endpoint crea usuarios. Ademas del caso feliz, que prueba negativa es valiosa?",
    explanation:
      "Las pruebas negativas revisan que el sistema rechace entradas invalidas de forma controlada.",
    correct: "Enviar email invalido y verificar error claro sin crear usuario",
    distractors: [
      "Enviar solo datos perfectos muchas veces",
      "Apagar la base de datos como primera prueba",
    ],
  },
  {
    id: "question_qa_state_transition",
    conceptSlugs: ["casos-prueba", "criterios-aceptacion"],
    prompt:
      "Un pedido puede pasar de creado a pagado, enviado y cancelado. Que foco de prueba ayuda mas?",
    explanation: "Los cambios de estado suelen tener reglas que impiden saltos invalidos.",
    correct: "Validar transiciones permitidas y bloqueos de transiciones invalidas",
    distractors: ["Revisar solo el color del badge de estado", "Crear pedidos sin cambiar estado"],
  },
  {
    id: "question_qa_traceability",
    conceptSlugs: ["criterios-aceptacion", "cobertura"],
    prompt:
      "Producto pregunta si cada criterio importante tiene alguna prueba asociada. Que concepto aparece?",
    explanation: "La trazabilidad conecta requisitos, pruebas y evidencia.",
    correct: "Trazabilidad entre criterios y casos de prueba",
    distractors: ["Flakiness", "Carga maxima"],
  },
  {
    id: "question_qa_release_go_no_go",
    conceptSlugs: ["riesgo", "humo"],
    prompt:
      "Despues de una prueba de humo fallan login y pagos. Que recomendacion es mas responsable?",
    explanation:
      "Una prueba de humo que falla en flujos criticos indica que la build no esta lista.",
    correct: "No avanzar con release hasta resolver los bloqueos criticos",
    distractors: ["Ignorarlo porque quedan otras pruebas", "Aprobar si la pagina de inicio carga"],
  },
  {
    id: "question_qa_exploratory_charter",
    conceptSlugs: ["exploratorias", "riesgo"],
    prompt:
      "Vas a hacer una sesion exploratoria de 45 minutos. Que ayuda a mantener foco sin volverla rigida?",
    explanation: "Un charter orienta la exploracion sin convertirla en una lista cerrada.",
    correct: "Definir un charter con objetivo, area y riesgos a observar",
    distractors: ["No anotar nada para ser mas libre", "Seguir una lista inmutable de 300 pasos"],
  },
  {
    id: "question_qa_test_oracle",
    conceptSlugs: ["criterios-aceptacion", "casos-prueba"],
    prompt:
      "Estas probando un calculo de descuento y no sabes cual deberia ser el resultado correcto. Que falta?",
    explanation: "Un oraculo de prueba permite decidir si el resultado observado es correcto.",
    correct: "Una fuente confiable para comparar el resultado esperado",
    distractors: ["Mas navegadores instalados", "Un color distinto en el boton"],
  },
  {
    id: "question_qa_api_idempotency",
    conceptSlugs: ["api-testing", "casos-prueba"],
    prompt:
      "Un endpoint de reintento de pago puede recibir la misma solicitud dos veces por problemas de red. Que riesgo probarias?",
    explanation: "Algunos flujos necesitan manejar reintentos sin duplicar efectos.",
    correct: "Que no se cobre dos veces por el mismo intento",
    distractors: ["Que el logo se vea centrado", "Que todos los errores sean 200"],
  },
  {
    id: "question_qa_timeout_handling",
    conceptSlugs: ["api-testing", "performance"],
    prompt:
      "Una API externa tarda demasiado al confirmar direccion. Que comportamiento deberia probar el producto?",
    explanation:
      "Los sistemas reales deben manejar dependencia lenta o caida sin dejar al usuario atrapado.",
    correct: "Timeout controlado, mensaje claro y posibilidad de reintentar",
    distractors: ["Pantalla cargando para siempre", "Crear la direccion duplicada cada segundo"],
  },
  {
    id: "question_qa_visual_regression",
    conceptSlugs: ["regresion", "automatizacion"],
    prompt:
      "Un cambio de CSS rompe el layout del checkout sin afectar APIs. Que tipo de prueba podria detectarlo temprano?",
    explanation: "No toda regresion es de logica; tambien puede ser visual o de experiencia.",
    correct: "Prueba de regresion visual en pantallas criticas",
    distractors: ["Solo test unitario de suma", "Prueba de carga de base de datos"],
  },
  {
    id: "question_qa_privacy_export",
    conceptSlugs: ["seguridad", "observabilidad"],
    prompt:
      "Una exportacion de datos personales queda disponible mediante un link predecible. Que deberia preocupar?",
    explanation: "Datos personales requieren controles de acceso, auditoria y diseno cuidadoso.",
    correct: "Exposicion de datos personales por falta de autorizacion adecuada",
    distractors: ["Que el JSON tenga saltos de linea", "Que la descarga sea demasiado rapida"],
  },
  {
    id: "question_qa_done_definition",
    conceptSlugs: ["criterios-aceptacion", "ci"],
    prompt:
      "El equipo quiere evitar que historias lleguen a release sin validaciones minimas. Que acuerdo ayuda?",
    explanation: "La definicion de done establece expectativas compartidas de calidad.",
    correct: "Una definicion de done que incluya criterios, pruebas y evidencia necesaria",
    distractors: ["Depender de que alguien se acuerde al final", "Prohibir cambios pequenos"],
  },
];
