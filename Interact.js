document.addEventListener("DOMContentLoaded", function () {
  const compareButton = document.querySelector("button");
  const inputs = document.querySelectorAll("input");

  // 🔒 HARD-CODED DRUG DATA
  const drugDatabase = {
    Paracetamol: {
      uses: ["Pain relief", "Fever reduction"],
      sideEffects: ["Nausea", "Liver toxicity at high doses"],
      components: ["Paracetamol"]
    },
    Ibuprofen: {
      uses: ["Pain relief", "Inflammation reduction", "Arthritis"],
      sideEffects: ["Stomach irritation", "Kidney strain", "Dizziness"],
      components: ["Ibuprofen"]
    },
    Aspirin: {
      uses: ["Pain relief", "Blood thinning", "Stroke prevention"],
      sideEffects: ["Stomach ulcers", "Bleeding", "Tinnitus"],
      components: ["Acetylsalicylic Acid"]
    },
    Cetirizine: {
      uses: ["Allergy relief", "Runny nose", "Itchy eyes"],
      sideEffects: ["Drowsiness", "Dry mouth"],
      components: ["Cetirizine Hydrochloride"]
    },
    Amoxicillin: {
      uses: ["Bacterial infection treatment"],
      sideEffects: ["Rash", "Diarrhea", "Allergic reaction"],
      components: ["Amoxicillin"]
    },
    Lisinopril: {
      uses: ["High blood pressure", "Heart failure"],
      sideEffects: ["Cough", "Dizziness", "Low blood pressure"],
      components: ["Lisinopril"]
    },
    Metformin: {
      uses: ["Type 2 diabetes management"],
      sideEffects: ["Nausea", "Metallic taste", "Lactic acidosis (rare)"],
      components: ["Metformin Hydrochloride"]
    },
    Atorvastatin: {
      uses: ["Cholesterol reduction", "Heart disease prevention"],
      sideEffects: ["Muscle pain", "Liver issues"],
      components: ["Atorvastatin Calcium"]
    },
    Prednisone: {
      uses: ["Inflammation", "Allergic disorders", "Autoimmune conditions"],
      sideEffects: ["Weight gain", "Mood swings", "Weakened immunity"],
      components: ["Prednisone"]
    },
    Sertraline: {
      uses: ["Depression", "Anxiety", "OCD", "PTSD"],
      sideEffects: ["Sexual dysfunction", "Insomnia", "Nausea"],
      components: ["Sertraline Hydrochloride"]
    },
    Azithromycin: {
      uses: ["Bacterial infections", "Respiratory infections"],
      sideEffects: ["Diarrhea", "Nausea", "Abdominal pain"],
      components: ["Azithromycin"]
    },
    Levothyroxine: {
      uses: ["Hypothyroidism"],
      sideEffects: ["Hair loss", "Weight changes", "Nervousness"],
      components: ["Levothyroxine Sodium"]
    },
    Amlodipine: {
      uses: ["High blood pressure", "Chest pain (angina)"],
      sideEffects: ["Swelling", "Fatigue", "Flushing"],
      components: ["Amlodipine Besylate"]
    },
    Omeprazole: {
      uses: ["GERD", "Stomach ulcers"],
      sideEffects: ["Headache", "Nausea", "Gas"],
      components: ["Omeprazole"]
    },
    Simvastatin: {
      uses: ["High cholesterol", "Heart disease prevention"],
      sideEffects: ["Muscle pain", "Liver damage"],
      components: ["Simvastatin"]
    },
    Hydrochlorothiazide: {
      uses: ["High blood pressure", "Fluid retention"],
      sideEffects: ["Dizziness", "Increased urination", "Low potassium"],
      components: ["Hydrochlorothiazide"]
    },
    Losartan: {
      uses: ["High blood pressure", "Kidney protection in diabetes"],
      sideEffects: ["Dizziness", "Back pain", "Cold symptoms"],
      components: ["Losartan Potassium"]
    },
    Gabapentin: {
      uses: ["Seizures", "Nerve pain"],
      sideEffects: ["Drowsiness", "Dizziness", "Fatigue"],
      components: ["Gabapentin"]
    },
    Albuterol: {
      uses: ["Asthma", "COPD"],
      sideEffects: ["Shakiness", "Nervousness", "Headache"],
      components: ["Albuterol Sulfate"]
    },
    Furosemide: {
      uses: ["Fluid retention", "High blood pressure"],
      sideEffects: ["Frequent urination", "Dizziness", "Dehydration"],
      components: ["Furosemide"]
    },
  };
  
  // Placeholder entries for additional 40 drugs
  for (let i = 21; i <= 60; i++) {
    drugDatabase[`Drug${i}`] = {
      uses: [`Use case ${i}`],
      sideEffects: [`Side effect ${i}A`, `Side effect ${i}B`],
      components: [`Component${i}`]
    };
  }
  
  

  // 🔄 INTERACTION MESSAGES
  const interactionMessages = {
    "Paracetamol-Ibuprofen": "Safe for short-term combined use. Monitor liver and kidney function if used regularly.",
    "Ibuprofen-Aspirin": "Avoid concurrent use for pain relief. Ibuprofen may interfere with aspirin’s heart protection benefits.",
    "Aspirin-Paracetamol": "Generally safe together. May increase stomach discomfort in sensitive individuals.",
    "Ibuprofen-Lisinopril": "Use with caution. May reduce kidney function and blunt blood pressure control.",
    "Ibuprofen-Metformin": "Monitor kidney function, especially in elderly or dehydrated patients.",
    "Lisinopril-Metformin": "Safe, but both drugs affect kidneys. Monitor function if used long-term.",
    "Amoxicillin-Ibuprofen": "Safe for treating infections with pain or fever. No major interaction.",
    "Sertraline-Ibuprofen": "May increase bleeding risk. Use cautiously and monitor for bruising.",
    "Prednisone-Ibuprofen": "Avoid long-term combined use. Increased risk of stomach ulcers and GI bleeding.",
    "Sertraline-Aspirin": "Can increase bleeding risk. Use with medical supervision.",
    "Cetirizine-Paracetamol": "No significant interaction. Often combined safely in cold/allergy relief.",
    "Azithromycin-Amoxicillin": "No significant interaction. Both can be used together under guidance.",
    "Metformin-Omeprazole": "May affect vitamin B12 absorption. Monitor with long-term use.",
    "Lisinopril-Furosemide": "Can significantly lower blood pressure. Monitor electrolytes and kidney function.",
    "Amlodipine-Lisinopril": "Often prescribed together for blood pressure control. Monitor for low BP.",
    "Atorvastatin-Amlodipine": "No major interaction. Sometimes prescribed together for heart health.",
    "Gabapentin-Sertraline": "May cause increased sedation or dizziness. Use cautiously.",
    "Prednisone-Omeprazole": "Omeprazole may protect stomach from prednisone-related irritation.",
    "Albuterol-Prednisone": "Safe and commonly used together in asthma flare-ups.",
    "Metformin-Furosemide": "Increased risk of dehydration and kidney issues. Monitor closely.",
    "Levothyroxine-Omeprazole": "Omeprazole may reduce levothyroxine absorption. Take at different times.",
    "Cetirizine-Sertraline": "May increase drowsiness. Avoid alcohol and monitor sedation levels.",
    "Aspirin-Losartan": "May reduce the effectiveness of Losartan and affect kidney function.",
    "Hydrochlorothiazide-Lisinopril": "Common combination. Monitor blood pressure and potassium levels.",
    "Simvastatin-Amiodarone": "Increased risk of muscle toxicity. Avoid high simvastatin doses.",
    "Gabapentin-Metformin": "No major interaction. Monitor for dizziness or fatigue.",
    "Azithromycin-Atorvastatin": "May increase risk of muscle pain. Monitor symptoms if used together.",
    "Paracetamol-Atorvastatin": "No known interaction. Safe for use together.",
    "Furosemide-Digoxin": "Increased risk of digoxin toxicity. Monitor potassium and digoxin levels.",
    "Drug21-Drug22": "Placeholder note: review specific components for interaction guidance.",
    "Drug23-Drug24": "Placeholder note: monitor patient history when combining new medications.",
    "Drug25-Drug26": "Unknown interaction. Consult a pharmacist for patient-specific advice.",
    "Drug27-Drug28": "Use clinical judgment. Interaction risk may depend on dosing and duration.",
    "Drug29-Drug30": "Check for potential duplicate therapeutic effects before combining.",
  };
  

  compareButton.addEventListener("click", function () {
    const drug1Input = inputs[0].value.trim();
    const drug2Input = inputs[1].value.trim();

    if (!drug1Input || !drug2Input) {
      alert("Please enter both drug names.");
      return;
    }

    const drug1 = formatDrugName(drug1Input);
    const drug2 = formatDrugName(drug2Input);

    updateDrugCard(1, drug1, drugDatabase[drug1]);
    updateDrugCard(2, drug2, drugDatabase[drug2]);

    showInteraction(drug1, drug2);
  });

  function formatDrugName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  function updateDrugCard(cardNumber, drugName, data) {
    const title = document.getElementById(`drug${cardNumber}-title`);
    const uses = document.getElementById(`drug${cardNumber}-uses`);
    const effects = document.getElementById(`drug${cardNumber}-effects`);
    const components = document.getElementById(`drug${cardNumber}-components`);

    title.textContent = `Drug ${cardNumber}: ${drugName}`;

    if (!data) {
      uses.innerHTML = "<li>No data available</li>";
      effects.innerHTML = "<li>No data available</li>";
      components.innerHTML = "<li>No data available</li>";
    } else {
      uses.innerHTML = data.uses.map((u) => `<li>${u}</li>`).join("");
      effects.innerHTML = data.sideEffects.map((s) => `<li>${s}</li>`).join("");
      components.innerHTML = data.components.map((c) => `<li>${c}</li>`).join("");
    }
  }

  function showInteraction(drug1, drug2) {
    const key1 = `${drug1}-${drug2}`;
    const key2 = `${drug2}-${drug1}`;
    const message =
      interactionMessages[key1] ||
      interactionMessages[key2] ||
      "No known interaction between these drugs.";

    const box = document.getElementById("interaction-message");
    box.textContent = `Interaction: ${message}`;
    box.classList.remove("hidden");
  }
});
