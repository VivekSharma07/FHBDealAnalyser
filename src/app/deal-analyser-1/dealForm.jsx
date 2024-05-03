"use client";
import React, { useState, useRef, useEffect } from "react";
import "./DealAnalyserForm.css";
import CurrencyInput from "react-currency-input-field";

const DealAnalyserForm = () => {
  const [formData, setFormData] = useState({
    propertyAddress: "",
    totalSqFootage: 0,
    evaluatorName: "",
    propertyDescription: "",
    numberOfUnits: 0,
    date: "",
    daysOnMarket: "",
    occupied: "",
    afterRepairValue: 0,
    currentAsIsValue: 0,
    estimatedRepairCosts: 0,
    purchasePrice: 0,
    propertyTaxesAnnually: 0,
    hoaAndCondoFeesAnnually: 0,
    hoaAndCondoFeesMonthly: 0,
    insuranceCostsAnnually: 0,
    utilityCostsAnnually: 0,
    utilityCostsMonthly: 0,
    gasCostsMonthly: 0,
    waterCostsMonthly: 0,
    electricityCostsMonthly: 0,
    otherCostsMonthly: 0,
    estimatedHoldTime: 0,
    firstMortgageAmount: 90,
    firstMortgagePoints: 3,
    firstMortgageInterest: 12,
    secondMortgageAmount: 0,
    secondMortgagePoints: 0,
    secondMortgageInterest: 0,
    miscMortgageAmount: 0,
    miscMortgagePoints: 0,
    miscMortgageInterest: 0,
    miscellaneousFinancingCosts: 0,
    chalireFees: 0,
    totalCashNeededForDeal: 0,
    interestToLender: 0,
  });
  const addressInputRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC4UXWDrbeXjmDGVhLlZMOaA689Whv1WMk=&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initAutocomplete;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const initAutocomplete = () => {
    if (!addressInputRef.current || !window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      addressInputRef.current
    );
    autocomplete.setComponentRestrictions({ country: ["us"] });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setFormData((prevData) => ({
        ...prevData,
        propertyAddress: place.formatted_address,
      }));
    });
  };

  function calculateAnnuallValue(value) {
    if (!value) return 0;
    return value * 12;
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue =
      type === "number" ? parseFloat(value.replace(/[^0-9.]/g, "")) : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleCurrencyChange = (name, value) => {
    if (!value) return 0;
    const parsedValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const calculateMonthlyValue = (annualValue) => {
    if (!annualValue) return;
    return annualValue / 12;
  };

  const calculateValues = () => {
    const firstMortgageAmount = formData.purchasePrice * 0.9;
    const firstMortgagePoints = firstMortgageAmount * 0.03;
    const firstMortgageInterest = firstMortgageAmount * 0.12;
    const firstMortgageMonthlyInterestOnlyPayment =
      (firstMortgageAmount * formData.firstMortgageInterest) / 12;

    const secondMortgageAmount =
      formData.purchasePrice * formData.secondMortgageAmount;
    const secondMortgagePoints =
      secondMortgageAmount * formData.secondMortgagePoints;
    const secondMortgageInterest =
      secondMortgageAmount * formData.secondMortgageInterest;
    const secondMortgageMonthlyInterestOnlyPayment =
      (secondMortgageAmount * formData.secondMortgageInterest) / 12;

    const miscMortgageAmount =
      formData.purchasePrice * formData.miscMortgageAmount;
    const miscMortgagePoints = miscMortgageAmount * formData.miscMortgagePoints;
    const miscMortgageInterest =
      miscMortgageAmount * formData.miscMortgageInterest;
    const miscMortgageMonthlyInterestOnlyPayment =
      (miscMortgageAmount * formData.miscMortgageInterest) / 12;

    const totalFinancingCosts =
      firstMortgagePoints +
      secondMortgagePoints +
      miscMortgagePoints +
      formData.miscellaneousFinancingCosts +
      formData.chalireFees;
    const totalCashNeededForDeal =
      formData.downPayment +
      formData.closingCosts +
      formData.repairCosts +
      totalFinancingCosts;
    const interestToLender = totalCashNeededForDeal * 0.15;

    setFormData((prevData) => ({
      ...prevData,
      firstMortgageAmount,
      firstMortgagePoints,
      firstMortgageInterest,
      firstMortgageMonthlyInterestOnlyPayment,
      secondMortgageAmount,
      secondMortgagePoints,
      secondMortgageInterest,
      secondMortgageMonthlyInterestOnlyPayment,
      miscMortgageAmount,
      miscMortgagePoints,
      miscMortgageInterest,
      miscMortgageMonthlyInterestOnlyPayment,
      totalFinancingCosts,
      totalCashNeededForDeal,
      interestToLender,
    }));
  };
  return (
    <div className="deal-analyser-form">
      <h1 className="text-4xl mb-10 items-center font-medium">
        Deal Analyser v1
      </h1>
      <h1 className="text-2xl mb-10 items-center text-gray-300">Basic Info</h1>

      <div className="w-full border-t border-gray-300 my-8"></div>
      <form>
        <div className="form-grid">
          <div className="column-1">
            <div className="form-group">
              <label htmlFor="propertyAddress">
                Property Address
                <span className="hint-icon" title="Enter the property address">
                  &#9432;
                </span>
              </label>
              <input
                type="text"
                id="propertyAddress"
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleInputChange}
                ref={addressInputRef}
                className="text-text bg-blue-100"
              />
            </div>
            <div className="form-group">
              <label htmlFor="totalSqFootage">
                Total Sq Footage
                <span
                  className="hint-icon"
                  title="Enter the total square footage"
                >
                  &#9432;
                </span>
              </label>
              <input
                type="number"
                id="totalSqFootage"
                name="totalSqFootage"
                value={formData.totalSqFootage}
                onChange={handleInputChange}
                className="text-text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="evaluatorName">
                Evaluator Name
                <span className="hint-icon" title="Enter the evaluator's name">
                  &#9432;
                </span>
              </label>
              <input
                type="text"
                id="evaluatorName"
                name="evaluatorName"
                value={formData.evaluatorName}
                onChange={handleInputChange}
                className="text-text bg-blue-100"
              />
            </div>
            <div className="form-group">
              <label htmlFor="propertyDescription">
                Property Description
                <span
                  className="hint-icon"
                  title="Enter a description of the property"
                >
                  &#9432;
                </span>
              </label>
              <textarea
                id="propertyDescription"
                name="propertyDescription"
                value={formData.propertyDescription}
                onChange={handleInputChange}
                className="text-text"
              ></textarea>
            </div>
          </div>
          <div className="column-2">
            <div className="form-group">
              <label htmlFor="numberOfUnits">
                No. of Units
                <span className="hint-icon" title="Enter the number of units">
                  &#9432;
                </span>
              </label>
              <input
                type="number"
                id="numberOfUnits"
                name="numberOfUnits"
                value={formData.numberOfUnits}
                onChange={handleInputChange}
                className="text-text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">
                Date
                <span className="hint-icon" title="Select the date">
                  &#9432;
                </span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="text-text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="daysOnMarket">
                DOM
                <span className="hint-icon" title="Enter the days on market">
                  &#9432;
                </span>
              </label>
              <input
                type="text"
                id="daysOnMarket"
                name="daysOnMarket"
                value={formData.daysOnMarket}
                onChange={handleInputChange}
                className="text-text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="occupied">
                Occupied
                <span className="hint-icon" title="Select the occupancy status">
                  &#9432;
                </span>
              </label>
              <select
                id="occupied"
                name="occupied"
                value={formData.occupied}
                onChange={handleInputChange}
                className="text-text"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        <h1 className="text-2xl mb-10 items-center align-middle justify-center text-gray-300">
          PROPERTY INFO
        </h1>

        <div className="w-full border-t border-gray-300 my-8"></div>

        <div className="form-grid equal-height-grid">
          <div className="">
            <fieldset>
              <legend>
                <h1 className="text-1xl mb-10 items-center">
                  Property Values & Pricing
                </h1>
              </legend>

              <div className="form-group">
                <label htmlFor="afterRepairValue">
                  After Repair Value (ARV)
                  <span
                    className="hint-icon"
                    title="Enter the after repair value"
                  >
                    &#9432;
                  </span>
                </label>
                <CurrencyInput
                  id="afterRepairValue"
                  name="afterRepairValue"
                  prefix="$"
                  placeholder="Please enter ARV"
                  defaultValue={0}
                  decimalsLimit={2}
                  className="text-text bg-blue-100"
                  onValueChange={(value) =>
                    handleCurrencyChange("afterRepairValue", value)
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="currentAsIsValue">
                  Current As-Is Value
                  <span
                    className="hint-icon"
                    title="Enter the current as-is value"
                  >
                    &#9432;
                  </span>
                </label>
                <CurrencyInput
                  id="currentAsIsValue"
                  name="currentAsIsValue"
                  prefix="$"
                  placeholder="Please enter current As-IS value of the property"
                  defaultValue={0}
                  decimalsLimit={2}
                  className="text-text"
                  onValueChange={(value) =>
                    handleCurrencyChange("currentAsIsValue", value)
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="estimatedRepairCosts">
                  Estimated Repair Costs
                  <span
                    className="hint-icon"
                    title="Enter the estimated repair costs"
                  >
                    &#9432;
                  </span>
                </label>
                <CurrencyInput
                  id="estimatedRepairCosts"
                  name="estimatedRepairCosts"
                  prefix="$"
                  placeholder="Please enter estimated repair value"
                  defaultValue={0}
                  decimalsLimit={2}
                  className="text-text bg-blue-100"
                  onValueChange={(value) =>
                    handleCurrencyChange("estimatedRepairCosts", value)
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="purchasePrice">
                  Purchase Price
                  <span className="hint-icon" title="Enter the purchase price">
                    &#9432;
                  </span>
                </label>
                <CurrencyInput
                  id="purchasePrice"
                  name="purchasePrice"
                  prefix="$"
                  placeholder="Please enter a number"
                  defaultValue={0}
                  decimalsLimit={2}
                  className="text-text bg-blue-100"
                  onValueChange={(value) =>
                    handleCurrencyChange("purchasePrice", value)
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="estimatedHoldTime">
                  Estimated Hold Time (months)
                  <span
                    className="hint-icon"
                    title="Enter the estimated hold time in months"
                  >
                    &#9432;
                  </span>
                </label>
                <input
                  type="number"
                  id="estimatedHoldTime"
                  name="estimatedHoldTime"
                  value={formData.estimatedHoldTime}
                  onChange={handleInputChange}
                  className="text-text"
                />
              </div>
              <label
                htmlFor="purchaseAndRepairCosts"
                className="text-xl text-gray-300 my-5"
              >
                Purchase & Repair Costs
                <span
                  className="hint-icon"
                  title="Enter the purchase and repair costs"
                >
                  &#9432;
                </span>
                <span className="mx-5 bg-gray-1000 text-white">
                  {formatCurrency(
                    formData.purchasePrice + formData.estimatedRepairCosts
                  )}
                </span>
              </label>
              <label
                htmlFor="financingCosts"
                className="text-2xl text-gray-300 my-5"
              >
                Financing Costs
                <span className="hint-icon" title="Enter the financing costs">
                  &#9432;
                </span>
              </label>
              
              
            </fieldset>
            
          </div>
          <div className="column-2">
            <fieldset>
              <legend>
                <h1 className="text-1xl mb-10 items-center ">
                  Holding Costs (Monthly)
                </h1>
              </legend>
              <div className="holding-costs-grid">
                <div className="holding-costs-header text-gray-300">
                  Holding Costs
                </div>
                <div className="holding-costs-header text-gray-300">
                  Annually
                </div>
                <div className="holding-costs-header text-gray-300">
                  Monthly
                </div>

                <div className="form-group">
                  <label htmlFor="propertyTaxesAnnually">Property Taxes</label>
                </div>
                <div className="form-group">
                  <CurrencyInput
                    id="propertyTaxesAnnually"
                    name="propertyTaxesAnnually"
                    prefix="$"
                    placeholder="Please enter property taxes annually"
                    defaultValue={0}
                    decimalsLimit={2}
                    className="text-text"
                    onValueChange={(value) =>
                      handleCurrencyChange("propertyTaxesAnnually", value)
                    }
                  />
                </div>
                <div className="form-group">
                  <span>
                    {formatCurrency(
                      calculateMonthlyValue(formData.propertyTaxesAnnually)
                    )}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="hoaAndCondoFeesAnnually">
                    HOA and Condo Fees
                  </label>
                </div>
                <div className="form-group">
                  <CurrencyInput
                    id="hoaAndCondoFeesAnnually"
                    name="hoaAndCondoFeesAnnually"
                    prefix="$"
                    placeholder="Please enter HOA and Condo Fees Annually"
                    defaultValue={0}
                    decimalsLimit={2}
                    className="text-text"
                    onValueChange={(value) =>
                      handleCurrencyChange("hoaandCondoFeesAnnually", value)
                    }
                  />
                </div>
                <div className="form-group">
                  <span>
                    {formatCurrency(
                      calculateMonthlyValue(formData.hoaandCondoFeesAnnually)
                    )}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="insuranceCostsAnnually">
                    Insurance Costs
                  </label>
                </div>
                <div className="form-group">
                  <CurrencyInput
                    id="insuranceCostsAnnually"
                    name="insuranceCostsAnnually"
                    prefix="$"
                    placeholder="Please enter Insurance Costs Annually"
                    defaultValue={0}
                    decimalsLimit={2}
                    className="text-text"
                    onValueChange={(value) =>
                      handleCurrencyChange("insuranceCostsAnnually", value)
                    }
                  />
                </div>
                <div className="form-group">
                  <span>
                    {formatCurrency(
                      calculateMonthlyValue(formData.insuranceCostsAnnually)
                    )}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="utilityCostsAnnually">
                    Utility Costs (Expandable)
                  </label>
                </div>

                <div className="form-group">
                  <span>
                    {formatCurrency(
                      calculateAnnuallValue(formData.gasCostsMonthly) +
                        calculateAnnuallValue(formData.waterCostsMonthly) +
                        calculateAnnuallValue(
                          formData.electricityCostsMonthly
                        ) +
                        calculateAnnuallValue(formData.otherCostsMonthly)
                    )}
                  </span>
                </div>
                <div className="form-group">
                  <span>
                    {formatCurrency(
                      formData.gasCostsMonthly +
                        formData.waterCostsMonthly +
                        formData.electricityCostsMonthly +
                        formData.otherCostsMonthly
                    )}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="gasCosts">Gas</label>
                </div>

                <div className="form-group">
                  <span>
                    {formatCurrency(
                      calculateAnnuallValue(formData.gasCostsMonthly)
                    )}
                  </span>
                </div>
                <div className="form-group">
                  <CurrencyInput
                    id="gasCostsMonthly"
                    name="gasCostsMonthly"
                    prefix="$"
                    placeholder="Please enter Gas Costs Monthly"
                    defaultValue={0}
                    decimalsLimit={2}
                    className="text-text"
                    onValueChange={(value) =>
                      handleCurrencyChange("gasCostsMonthly", value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="waterCosts">Water</label>
                </div>

                <div className="form-group">
                  <span>
                    {formatCurrency(
                      calculateAnnuallValue(formData.waterCostsMonthly)
                    )}
                  </span>
                </div>
                <div className="form-group">
                  <CurrencyInput
                    id="waterCostsMonthly"
                    name="waterCostsMonthly"
                    prefix="$"
                    placeholder="Please enter Water Costs Monthly"
                    defaultValue={0}
                    decimalsLimit={2}
                    className="text-text"
                    onValueChange={(value) =>
                      handleCurrencyChange("waterCostsMonthly", value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="electricityCosts">Electricity</label>
                </div>

                <div className="form-group">
                  <span>
                    {formatCurrency(
                      calculateAnnuallValue(formData.electricityCostsMonthly)
                    )}
                  </span>
                </div>
                <div className="form-group">
                  <CurrencyInput
                    id="electricityCostsMonthly"
                    name="electricityCostsMonthly"
                    prefix="$"
                    placeholder="Please enter Electricity Costs Monthly"
                    defaultValue={0}
                    decimalsLimit={2}
                    className="text-text"
                    onValueChange={(value) =>
                      handleCurrencyChange("electricityCostsMonthly", value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="otherCosts">Other</label>
                </div>

                <div className="form-group">
                  <span>
                    {formatCurrency(
                      calculateAnnuallValue(formData.otherCostsMonthly)
                    )}
                  </span>
                </div>
                <div className="form-group">
                  <CurrencyInput
                    id="otherCostsMonthly"
                    name="otherCostsMonhtly"
                    prefix="$"
                    placeholder="Please enter Other Costs Monthly"
                    defaultValue={0}
                    decimalsLimit={2}
                    className="text-text"
                    onValueChange={(value) =>
                      handleCurrencyChange("otherCostsMonthly", value)
                    }
                  />
                </div>
              </div>
            </fieldset>
          </div>  
                  
        </div>

        
      </form>
    </div>
  );
};

export default DealAnalyserForm;
