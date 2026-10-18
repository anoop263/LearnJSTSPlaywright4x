let responseTime = 850;  // ms
let sla = 1000;          // ms
let slaStatus = responseTime <= sla ? "Within SLA ✅" : "SLA breached ❌";
console.log(`Response: ${responseTime}ms — ${slaStatus}`);
   //ans Response: 850ms — Within SLA ✅

// Template Literal
console.log(`What is the SLA time ? - ${sla}`);   //What is the SLA time ? - 1000 