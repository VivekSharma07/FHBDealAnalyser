"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import CurrencyInput from "react-currency-input-field";
import "./DealAnalyserForm.css";
import {db, auth} from '../../../../firebase/firebaseConfig'
import {useRouter} from 'next/navigation'
import { toast } from "react-toastify";
import { handleSave } from "@/lib/fetchData";

import { ToastContainer } from "react-toastify";
const DealFormDynamic = ({initialData, docId}) => {
    const router = useRouter();
  const [openSections, setOpenSections] = useState({
    basicInfo: true,
    propertyDescription: true,
    holdingCosts: true,
    financingCosts: true,
    buyingTransactionsCosts: true,
    profits: true,
    sellingTransactionsCosts: true,
    purchaseDealAnalysis: true,
    potentialReturnProfitAnalysis: true,
  });



  // const handleSave = async () => {
  //   setSaving(true);
  //   try {
  //     if (initialData?.id) {
  //       // Update existing document
  //       const dealAnalyzerRef = doc(db, "deal-analyser", initialData.id);
  //       await setDoc(dealAnalyzerRef, formData);
  //       router.push(`/deal-analyser-1/deals/${initialData.id}`);
  //     } else {
  //       // Create new document
  //       const dealAnalyzerCollectionRef = collection(db, "deal-analyser");
  //       const newDealAnalyzerRef = await addDoc(dealAnalyzerCollectionRef, formData);
  //       toast.success(`Deal Updated with ID: ${newDealAnalyzerRef.id}`, {
  //         position: "bottom-right",
  //         autoClose: 2000,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error saving deal analyzer:", error);
  //     toast.error(`Error in updating the deal: ${error.message}`, {
  //       position: "bottom-right",
  //       autoClose: 2000,
  //     });
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  
  const handleCancel = () => {
    router.push("/deal-analyser-1");
  };
  const [formData, setFormData] = useState(initialData)
  const [saving, setSaving] = useState(false)
//   previous states
//   const [formData, setFormData] = useState({
//     propertyAddress: "",
//     totalSqFootage: 1,
//     evaluatorName: "",
//     propertyDescription: "",
//     numberOfUnits: 0,
//     date: new Date().toISOString().slice(0, 10),
//     daysOnMarket: "",
//     occupied: "",
//     afterRepairValue: 0,
//     currentAsIsValue: 0,
//     estimatedRepairCosts: 0,
//     purchasePrice: 0,
//     propertyTaxesAnnually: 6173,
//     hoaAndCondoFeesAnnually: 0,
//     hoaAndCondoFeesMonthly: 0,
//     insuranceCostsAnnually: 1600,
//     utilityCostsAnnually: 0,
//     utilityCostsMonthly: 0,
//     gasCostsMonthly: 100,
//     waterCostsMonthly: 20,
//     electricityCostsMonthly: 75,
//     otherCostsMonthly: 0,
//     estimatedHoldTime: 4,
//     firstMortgageAmount: 0,
//     firstMortgageAmountPercentage: 90,
//     firstMortgagePoints: 3,
//     firstMortgageInterest: 12,
//     secondMortgageAmount: 0,
//     secondMortgageAmountPercentage: 0,
//     secondMortgagePoints: 0,
//     secondMortgageInterest: 0,
//     miscMortgageAmount: 0,
//     miscMortgageAmountPercentage: 0,
//     miscMortgagePoints: 0,
//     miscMortgageInterest: 0,
//     miscellaneousFinancingCosts: 0,
//     chalireFees: 1845,
//     totalCashNeededForDeal: 0,
//     interestToLender: 0,
//     totalFinancingCosts: 0,
//     escrowAttorneyFees: 900,
//     titleInsuranceSearchCostsPercentage: 0.25,
//     miscBuyingCostsPerc: 1.25,
//     sellingEscrowAttorneyFees: 900,
//     sellingRecordingFees: 500,
//     realtorFeePercent: 5,
//     transferConveyanceFeePercentage: 0.35,
//     homeWarranty: 0,
//     stagingCosts: 0,
//     marketingCosts: 0,
//     miscSellingCosts: 0,
//     miscHoldingCosts: 0,
//   });

  const addressInputRef = useRef(null);
  async function onSave () {
    try {
      await handleSave(formData, setSaving, docId);
      toast.success("Deal Saved!", {
                position: "bottom-right",
                autoClose: 2000,
              });
    } catch (error) {
      toast.error(`Error in saving deal: ${error.message}`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
    
  };
  //google maps api useeffect
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

  //total cash needed useeffect
  useEffect(() => {
    //this useEffect is for calling Cash Needed for Deal whenever underlying data changes in dependency array

    cashNeededForDeal();
  }, [
    formData.estimatedRepairCosts,
    formData.purchasePrice,
    formData.firstMortgageAmount,
    formData.firstMortgagePoints,
    formData.firstMortgageAmount,
    formData.firstMortgageInterest,
    formData.estimatedHoldTime,
    formData.secondMortgagePoints,
    formData.secondMortgageAmount,
    formData.secondMortgageInterest,
    formData.miscMortgagePoints,
    formData.miscMortgageAmount,
    formData.miscMortgageInterest,
    formData.escrowAttorneyFees,
    formData.miscellaneousFinancingCosts,
    formData.chalireFees,
    formData.titleInsuranceSearchCostsPercentage,
    formData.miscBuyingCostsPerc,
  ]);

  //total financing costs useEffect
  useEffect(() => {
    calculateTotalFinancingCosts();
  }, [
    formData.estimatedRepairCosts,
    formData.purchasePrice,
    formData.firstMortgageAmount,
    formData.firstMortgagePoints,
    formData.firstMortgageAmount,
    formData.firstMortgageInterest,
    formData.estimatedHoldTime,
    formData.secondMortgagePoints,
    formData.secondMortgageAmount,
    formData.secondMortgageInterest,
    formData.miscMortgagePoints,
    formData.miscMortgageAmount,
    formData.miscMortgageInterest,
    formData.miscellaneousFinancingCosts,
    formData.chalireFees,
  ]);
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

  function addMonthsToDate(date, months) {
    if (date === null || date === undefined) {
      return null;
    }

    const inputDate = new Date(date);
    const futureDate = new Date(
      inputDate.setMonth(inputDate.getMonth() + months)
    );

    const day = String(futureDate.getDate()).padStart(2, "0");
    const month = String(futureDate.getMonth() + 1).padStart(2, "0");
    const year = futureDate.getFullYear();

    return `${day}/${month}/${year}`;
  }
  const toggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
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
    if (!annualValue) return 0;
    return annualValue / 12;
  };

  const cashNeededForDeal = () => {
    const d27 = formData.estimatedRepairCosts + formData.purchasePrice;
    const d29 = formData.firstMortgageAmount;
    const d30 = (formData.firstMortgagePoints / 100) * d29;
    const d31 =
      ((formData.firstMortgageAmount * formData.firstMortgageInterest) /
        100 /
        12) *
      formData.estimatedHoldTime;
    const d34 =
      (formData.secondMortgagePoints / 100) * formData.secondMortgageAmount;
    const d35 =
      ((formData.secondMortgageAmount * formData.secondMortgageInterest) /
        100 /
        12) *
      formData.estimatedHoldTime;
    const d38 =
      (formData.miscMortgagePoints / 100) * formData.miscMortgageAmount;
    const d39 =
      ((formData.miscMortgageAmount * formData.miscMortgageInterest) /
        100 /
        12) *
      formData.estimatedHoldTime;
    const d41 = formData.miscellaneousFinancingCosts;
    const d42 = formData.chalireFees;
    const h33 =
      formData.escrowAttorneyFees +
      (500 +
        (formData.titleInsuranceSearchCostsPercentage / 100) *
          formData.purchasePrice) +
      (formData.purchasePrice * formData.miscBuyingCostsPerc) / 100;

    // console.log('d27 = ', d27, "\t d29 =", d29, "\t d30 =", d30, "\t d31 =", d31, "\t d34 =", d34, "\t d35 =", d35, "\t d38 =", d38, "\t d39 =", d39, "\t d41 =", d41,"\t d42 =" , d42, "\t h33 =", h33)

    setFormData((prevData) => ({
      ...prevData,
      totalCashNeededForDeal:
        d27 - d29 + d30 + d31 + d34 + d35 + d38 + d39 + d41 + d42 + h33,
    }));
  };

  const calculateTotalFinancingCosts = () => {
    //the function returns the actual financing costs based on params required.
    const d27 = formData.estimatedRepairCosts + formData.purchasePrice;
    const d29 = formData.firstMortgageAmount;
    const d30 = (formData.firstMortgagePoints / 100) * d29;
    const d31 =
      ((formData.firstMortgageAmount * formData.firstMortgageInterest) /
        100 /
        12) *
      formData.estimatedHoldTime;
    const d34 =
      (formData.secondMortgagePoints / 100) * formData.secondMortgageAmount;
    const d35 =
      ((formData.secondMortgageAmount * formData.secondMortgageInterest) /
        100 /
        12) *
      formData.estimatedHoldTime;
    const d38 =
      (formData.miscMortgagePoints / 100) * formData.miscMortgageAmount;
    const d39 =
      ((formData.miscMortgageAmount * formData.miscMortgageInterest) /
        100 /
        12) *
      formData.estimatedHoldTime;
    const d41 = 0;

    const res = d30 + d31 + d34 + d35 + d38 + d39 + d41;
    setFormData((prevData) => ({
      ...prevData,
      totalFinancingCosts: res,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-screen overflow-y-auto text-sm">
        {Object.keys(initialData).length === 0 ? (
        <>
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-10 w-full" />
        </>
      ) : 
      (
        <div className="p-4 text-primary dark:text-primary-dark">
        <h1 className="text-3xl sm:text-4xl mb-8 items-center font-medium">
          Deal Analyser v1
        </h1>

        {/* 4 Cards at the top*/}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="shadow rounded-lg p-6 text-center border border-gray-400">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Estimated Net Profit
            </h3>
            <p className="text-2xl sm:text-4xl font-bold text-blue-600">
              {formData.afterRepairValue -
                formData.purchasePrice -
                formData.estimatedRepairCosts -
                formData.totalFinancingCosts -
                //total holding costs
                (formData.propertyTaxesAnnually / 12 +
                  formData.hoaAndCondoFeesMonthly +
                  formData.insuranceCostsAnnually / 12 +
                  formData.gasCostsMonthly +
                  formData.electricityCostsMonthly +
                  formData.waterCostsMonthly +
                  formData.otherCostsMonthly +
                  formData.miscHoldingCosts) *
                  formData.estimatedHoldTime -
                //total buying transaction costs
                (formData.escrowAttorneyFees +
                  (500 +
                    (formData.titleInsuranceSearchCostsPercentage / 100) *
                      formData.purchasePrice) +
                  (formData.purchasePrice * formData.miscBuyingCostsPerc) /
                    100) -
                //total selling transaction cost
                (formData.sellingEscrowAttorneyFees +
                  formData.sellingRecordingFees +
                  (formData.realtorFeePercent / 100) *
                    formData.afterRepairValue +
                  (formData.transferConveyanceFeePercentage / 100) *
                    formData.afterRepairValue +
                  formData.homeWarranty +
                  formData.stagingCosts +
                  formData.marketingCosts +
                  formData.miscSellingCosts) >
              0
                ? formatCurrency(
                    formData.afterRepairValue -
                      formData.purchasePrice -
                      formData.estimatedRepairCosts -
                      formData.totalFinancingCosts -
                      //total holding costs
                      (formData.propertyTaxesAnnually / 12 +
                        formData.hoaAndCondoFeesMonthly +
                        formData.insuranceCostsAnnually / 12 +
                        formData.gasCostsMonthly +
                        formData.electricityCostsMonthly +
                        formData.waterCostsMonthly +
                        formData.otherCostsMonthly +
                        formData.miscHoldingCosts) *
                        formData.estimatedHoldTime -
                      //total buying transaction costs
                      (formData.escrowAttorneyFees +
                        (500 +
                          (formData.titleInsuranceSearchCostsPercentage / 100) *
                            formData.purchasePrice) +
                        (formData.purchasePrice *
                          formData.miscBuyingCostsPerc) /
                          100) -
                      //total selling transaction cost
                      (formData.sellingEscrowAttorneyFees +
                        formData.sellingRecordingFees +
                        (formData.realtorFeePercent / 100) *
                          formData.afterRepairValue +
                        (formData.transferConveyanceFeePercentage / 100) *
                          formData.afterRepairValue +
                        formData.homeWarranty +
                        formData.stagingCosts +
                        formData.marketingCosts +
                        formData.miscSellingCosts)
                  )
                : "-"}
            </p>
          </div>

          <div className="shadow rounded-lg p-6 text-center border border-gray-400">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Total Financing Costs
            </h3>
            <p className="text-2xl sm:text-4xl font-bold text-blue-600">
              {formData.totalFinancingCosts > 0
                ? formatCurrency(formData.totalFinancingCosts)
                : "-"}
            </p>
          </div>

          <div className="shadow rounded-lg p-6 text-center border border-gray-400">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              My Committed Capital
            </h3>
            <p className="text-2xl sm:text-4xl font-bold text-blue-600">
              {formatCurrency(
                //this part is till H42
                //purchase price
                formData.purchasePrice +
                  //estimated repair costs below
                  formData.estimatedRepairCosts +
                  // first mortgage points below
                  (formData.firstMortgagePoints / 100) *
                    formData.firstMortgageAmount +
                  (formData.secondMortgagePoints / 100) *
                    formData.secondMortgageAmount +
                  formData.miscMortgagePoints +
                  //total holding costs below
                  (formData.propertyTaxesAnnually / 12 +
                    formData.hoaAndCondoFeesMonthly +
                    formData.insuranceCostsAnnually / 12 +
                    formData.gasCostsMonthly +
                    formData.electricityCostsMonthly +
                    formData.waterCostsMonthly +
                    formData.otherCostsMonthly +
                    formData.miscHoldingCosts) *
                    formData.estimatedHoldTime +
                  //total buying transactions costs below

                  (formData.escrowAttorneyFees +
                    (500 +
                      (formData.titleInsuranceSearchCostsPercentage / 100) *
                        formData.purchasePrice) +
                    (formData.purchasePrice * formData.miscBuyingCostsPerc) /
                      100) +
                  formData.stagingCosts +
                  formData.miscSellingCosts +
                  formData.marketingCosts -
                  (formData.firstMortgageAmount -
                    formData.secondMortgageAmount -
                    formData.miscMortgageAmount)
              ) > 0
                ? formatCurrency(
                    //this part is till H42
                    //purchase price
                    formData.purchasePrice +
                      //estimated repair costs below
                      formData.estimatedRepairCosts +
                      // first mortgage points below
                      (formData.firstMortgagePoints / 100) *
                        formData.firstMortgageAmount +
                      (formData.secondMortgagePoints / 100) *
                        formData.secondMortgageAmount +
                      formData.miscMortgagePoints +
                      //total holding costs below
                      (formData.propertyTaxesAnnually / 12 +
                        formData.hoaAndCondoFeesMonthly +
                        formData.insuranceCostsAnnually / 12 +
                        formData.gasCostsMonthly +
                        formData.electricityCostsMonthly +
                        formData.waterCostsMonthly +
                        formData.otherCostsMonthly +
                        formData.miscHoldingCosts) *
                        formData.estimatedHoldTime +
                      //total buying transactions costs below

                      (formData.escrowAttorneyFees +
                        (500 +
                          (formData.titleInsuranceSearchCostsPercentage / 100) *
                            formData.purchasePrice) +
                        (formData.purchasePrice *
                          formData.miscBuyingCostsPerc) /
                          100) +
                      formData.stagingCosts +
                      formData.miscSellingCosts +
                      formData.marketingCosts -
                      (formData.firstMortgageAmount -
                        formData.secondMortgageAmount -
                        formData.miscMortgageAmount)
                  )
                : "-"}
            </p>
          </div>

          <div className="shadow rounded-lg p-6 text-center border border-gray-400">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Purchase & Repair Costs
            </h3>
            <p className="text-2xl sm:text-4xl font-bold text-blue-600">
              {formData.purchasePrice + formData.estimatedRepairCosts > 0
                ? formatCurrency(
                    formData.purchasePrice + formData.estimatedRepairCosts
                  )
                : "-"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-300">
          {/* Basic Info */}
          <div className="col-span-2">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("basicInfo")}
            >
              <h2 className="text-xl font-semibold mb-4 mt-4">Basic Info</h2>
              {openSections.basicInfo ? (
                <FaChevronUp className="h-5 w-5 mx-2" />
              ) : (
                <FaChevronDown className="h-5 w-5 mx-2" />
              )}
            </div>
            {openSections.basicInfo && (
              <div className="mb-8">
                {/* Add fields for Basic Info */}

                <div className="form-grid">
                  <div className="column-1 border rounded-md border-gray-300 my-8">
                    <div className="form-group my-8">
                      <label htmlFor="propertyAddress">
                        Property Address
                        <span
                          className="hint-icon"
                          title="Enter the property address"
                        >
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
                        className="text-primary dark:text-primary-dark bg- w-full max-w-2xl"
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
                        className="text-primary dark:text-primary-dark"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="evaluatorName">
                        Evaluator Name
                        <span
                          className="hint-icon"
                          title="Enter the evaluator's name"
                        >
                          &#9432;
                        </span>
                      </label>
                      <input
                        type="text"
                        id="evaluatorName"
                        name="evaluatorName"
                        value={formData.evaluatorName}
                        onChange={handleInputChange}
                        className="text-text bg-"
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
                  <div className="column-2 border rounded-md border-gray-300 my-8">
                    <div className="form-group my-8">
                      <label htmlFor="numberOfUnits">
                        No. of Units
                        <span
                          className="hint-icon"
                          title="Enter the number of units"
                        >
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
                        <span
                          className="hint-icon"
                          title="Enter the days on market"
                        >
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
                        <span
                          className="hint-icon"
                          title="Select the occupancy status"
                        >
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
              </div>
            )}
          </div>

          {/* Property Description */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("propertyDescription")}
            >
              <h2 className="text-xl font-semibold mb-4">
                Property Description
              </h2>
              {openSections.propertyDescription ? (
                <FaChevronUp className="h-5 w-5 mx-2" />
              ) : (
                <FaChevronDown className="h-5 w-5 mx-2" />
              )}
            </div>
            {openSections.propertyDescription && (
              <div className="mb-8">
                {/* Add fields for Property Description */}

                <div className="w-full border-t border-gray-300 my-8"></div>

                <div className="">
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
                          className="text-text bg-"
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
                          className="text-text bg-"
                          onValueChange={(value) =>
                            handleCurrencyChange("estimatedRepairCosts", value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="purchasePrice">
                          Purchase Price
                          <span
                            className="hint-icon"
                            title="Enter the purchase price"
                          >
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
                          className="text-text bg-"
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
                        className="text-xl my-5"
                      >
                        Purchase & Repair Costs
                        <span
                          className="hint-icon"
                          title="Enter the purchase and repair costs"
                        >
                          &#9432;
                        </span>
                        <span className="mx-5">
                          {formatCurrency(
                            formData.purchasePrice +
                              formData.estimatedRepairCosts
                          )}
                        </span>
                      </label>
                    </fieldset>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Holding Costs */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("holdingCosts")}
            >
              <h2 className="text-xl font-semibold mb-4">Holding Costs</h2>
              {openSections.holdingCosts ? (
                <FaChevronUp className="h-5 w-5 mx-2" />
              ) : (
                <FaChevronDown className="h-5 w-5 mx-2" />
              )}
            </div>
            {openSections.holdingCosts && (
              <div className="my-8 mx-8">
                {/* Add fields for Holding Costs */}

                <div className="column-2">
                  <fieldset>
                    <legend>
                      <h1 className="text-1xl my-8 mx-8 items-center ">
                        Holding Costs (Monthly)
                      </h1>
                    </legend>
                    <div className="holding-costs-grid">
                      <div className="holding-costs-header">Holding Costs</div>
                      <div className="holding-costs-header">Annually</div>
                      <div className="holding-costs-header">Monthly</div>

                      <div className="form-group">
                        <label htmlFor="propertyTaxesAnnually">
                          Property Taxes
                        </label>
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
                            calculateMonthlyValue(
                              formData.propertyTaxesAnnually
                            )
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
                            handleCurrencyChange(
                              "hoaandCondoFeesAnnually",
                              value
                            )
                          }
                        />
                      </div>
                      <div className="form-group">
                        <span>
                          {formatCurrency(
                            calculateMonthlyValue(
                              formData.hoaandCondoFeesAnnually
                            )
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
                            handleCurrencyChange(
                              "insuranceCostsAnnually",
                              value
                            )
                          }
                        />
                      </div>
                      <div className="form-group">
                        <span>
                          {formatCurrency(
                            calculateMonthlyValue(
                              formData.insuranceCostsAnnually
                            )
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
                              calculateAnnuallValue(
                                formData.waterCostsMonthly
                              ) +
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
                              formData.otherCostsMonthly +
                              formData.miscHoldingCosts
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
                            calculateAnnuallValue(
                              formData.electricityCostsMonthly
                            )
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
                            handleCurrencyChange(
                              "electricityCostsMonthly",
                              value
                            )
                          }
                        />
                      </div>

                      {/* <div className="form-group">
                      <label htmlFor="otherCosts">Other</label>
                    </div>

                    <div className="form-group">
                      <span>
                        {formatCurrency(
                          calculateAnnuallValue(formData.otherCostsMonthly)
                        )}
                      </span>
                    </div> */}
                      <div className="form-group">
                        <label htmlFor="otherCosts">Other</label>
                      </div>
                      <div className="form-group">
                        <CurrencyInput
                          id="otherCostsMonthly"
                          name="otherCostsMonhtly"
                          prefix="$"
                          placeholder="Please enter Other Costs Monthly"
                          defaultValue={0}
                          decimalsLimit={2}
                          className="text-text col-span-2"
                          onValueChange={(value) =>
                            handleCurrencyChange("otherCostsMonthly", value)
                          }
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="miscHoldingCosts">
                        Misc. Holding costs
                      </label>
                      <CurrencyInput
                        id="miscHoldingCosts"
                        name="miscHoldingCosts"
                        prefix="$"
                        placeholder="Please enter Misc Holding Costs Monthly"
                        defaultValue={formData.miscHoldingCosts}
                        decimalsLimit={2}
                        className="text-text"
                        onValueChange={(value) =>
                          handleCurrencyChange("miscHoldingCosts", value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="totalHoldingCosts">
                        TOTAL HOLDING COSTS
                      </label>
                      <div className="calculated-field">
                        {formatCurrency(
                          formData.propertyTaxesAnnually / 12 +
                            formData.hoaAndCondoFeesMonthly +
                            formData.insuranceCostsAnnually / 12 +
                            formData.gasCostsMonthly +
                            formData.electricityCostsMonthly +
                            formData.waterCostsMonthly +
                            formData.otherCostsMonthly +
                            formData.miscHoldingCosts
                        )}
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            )}
          </div>

          {/* Financing Costs */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("financingCosts")}
            >
              <h2 className="text-xl font-semibold mb-4">Financing Costs</h2>
              {openSections.financingCosts ? (
                <FaChevronUp className="h-5 w-5 mx-2" />
              ) : (
                <FaChevronDown className="h-5 w-5 mx-2" />
              )}
            </div>
            {openSections.financingCosts && (
              <div className="mb-8">
                {/* Add fields for Financing Costs */}

                <div className="border rounded-md border-gray-300 my-8">
                  <div className="form-group my-8 mx-8">
                    <label htmlFor="firstMortgageAmount">
                      First Mortgage / Lien Amount
                    </label>
                    <div className="input-field">
                      <input
                        type="number"
                        id="firstMortgageAmountPercentage"
                        name="firstMortgageAmountPercentage"
                        value={formData.firstMortgageAmountPercentage}
                        onChange={handleInputChange}
                        className="text-text"
                      />
                      <span>%</span>
                    </div>
                    <CurrencyInput
                      id="firstMortgageAmount"
                      name="firstMortgageAmount"
                      prefix="$"
                      placeholder="Please enter first mortgage amount"
                      defaultValue={0}
                      decimalsLimit={2}
                      className="text-text bg-"
                      onValueChange={(value) =>
                        handleCurrencyChange("firstMortgageAmount", value)
                      }
                    />
                  </div>
                  <div className="form-group my-8 mx-8">
                    <label htmlFor="firstMortgagePoints">
                      First Mortgage Points
                    </label>
                    <div className="input-field">
                      <input
                        type="number"
                        id="firstMortgagePoints"
                        name="firstMortgagePoints"
                        value={formData.firstMortgagePoints}
                        onChange={handleInputChange}
                        className="text-text"
                      />
                    </div>
                    <div className="calculated-field">
                      {formatCurrency(
                        (formData.firstMortgagePoints / 100) *
                          formData.firstMortgageAmount
                      )}
                    </div>
                  </div>
                  <div className="form-group my-8 mx-8">
                    <label htmlFor="firstMortgageInterest">
                      First Mortgage Interest
                    </label>
                    <div className="input-field">
                      <input
                        type="number"
                        id="firstMortgageInterest"
                        name="firstMortgageInterest"
                        value={formData.firstMortgageInterest}
                        onChange={handleInputChange}
                        className="text-text"
                      />
                      <span>%</span>
                    </div>
                    <div className="calculated-field">
                      {formatCurrency(
                        ((formData.firstMortgageAmount *
                          formData.firstMortgageInterest) /
                          100 /
                          12) *
                          formData.estimatedHoldTime
                      )}
                    </div>
                  </div>
                  <div className="form-group my-8 mx-8">
                    <label>First Mortgage Monthly Interest Only Payment</label>
                    <div className="calculated-field">
                      {formatCurrency(
                        (((formData.firstMortgageAmount *
                          formData.firstMortgageInterest) /
                          100 /
                          12) *
                          formData.estimatedHoldTime) /
                          formData.estimatedHoldTime
                      )}
                    </div>
                  </div>
                  <div className="form-group my-8 mx-8">
                    <label htmlFor="secondMortgageAmountPercentage">
                      Second Mortgage / Lien Amount
                    </label>
                    <div className="input-field">
                      <input
                        type="number"
                        id="secondMortgageAmountPercentage"
                        name="secondMortgageAmountPercentage"
                        value={formData.secondMortgageAmountPercentage}
                        onChange={handleInputChange}
                        className="text-text"
                      />
                      <span>%</span>
                    </div>
                    <CurrencyInput
                      id="secondMortgageAmount"
                      name="secondMortgageAmount"
                      prefix="$"
                      placeholder="Please enter misc mortgage amount"
                      defaultValue={0}
                      decimalsLimit={2}
                      className="text-text"
                      onValueChange={(value) =>
                        handleCurrencyChange("secondMortgageAmount", value)
                      }
                    />
                  </div>
                  <div className="form-group my-8 mx-8">
                    <label htmlFor="secondMortgagePoints">
                      Second Mortgage Points
                    </label>
                    <div className="input-field">
                      <input
                        type="number"
                        id="secondMortgagePoints"
                        name="secondMortgagePoints"
                        value={formData.secondMortgagePoints}
                        onChange={handleInputChange}
                        className="text-text"
                      />
                    </div>
                    <div className="calculated-field">
                      {formatCurrency(
                        (formData.secondMortgagePoints / 100) *
                          formData.secondMortgageAmount
                      )}
                    </div>
                  </div>
                  <div className="form-group my-8 mx-8">
                    <label htmlFor="secondMortgageInterest">
                      Second Mortgage Interest
                    </label>
                    <div className="input-field">
                      <input
                        type="number"
                        id="secondMortgageInterest"
                        name="secondMortgageInterest"
                        value={formData.secondMortgageInterest}
                        onChange={handleInputChange}
                        className="text-text"
                      />
                      <span>%</span>
                    </div>
                    <div className="calculated-field">
                      {formatCurrency(
                        ((formData.secondMortgageAmount *
                          formData.secondMortgageInterest) /
                          100 /
                          12) *
                          formData.estimatedHoldTime
                      )}
                    </div>
                  </div>
                  <div className="form-group my-8 mx-8">
                    <label>Second Mortgage Monthly Interest Only Payment</label>
                    <div className="calculated-field">
                      {formatCurrency(
                        (((formData.secondMortgageAmount *
                          formData.secondMortgageInterest) /
                          100 /
                          12) *
                          formData.estimatedHoldTime) /
                          formData.estimatedHoldTime
                      )}
                    </div>
                  </div>
                  <div className="form-group my-8 mx-8">
                    <label htmlFor="miscMortgageAmountPercentage">
                      Misc. Mortgage / Lien Amount
                    </label>
                    <div className="input-field">
                      <input
                        type="number"
                        id="miscMortgageAmountPercentage"
                        name="miscMortgageAmountPercentage"
                        value={formData.miscMortgageAmountPercentage}
                        onChange={handleInputChange}
                        className="text-text"
                      />
                      <span>%</span>
                    </div>
                    <CurrencyInput
                      id="miscMortgageAmount"
                      name="miscMortgageAmount"
                      prefix="$"
                      placeholder="Please enter misc mortgage amount"
                      defaultValue={0}
                      decimalsLimit={2}
                      className="text-text"
                      onValueChange={(value) =>
                        handleCurrencyChange("miscMortgageAmount", value)
                      }
                    />
                  </div>

                  <div className="form-group my-8 mx-8">
                    <label htmlFor="miscMortgagePoints">
                      Misc. Mortgage Points
                    </label>
                    <div className="input-field">
                      <input
                        type="number"
                        id="miscMortgagePoints"
                        name="miscMortgagePoints"
                        value={formData.miscMortgagePoints}
                        onChange={handleInputChange}
                        className="text-text"
                      />
                    </div>
                    <div className="calculated-field">
                      {formatCurrency(
                        (formData.miscMortgagePoints / 100) *
                          formData.miscMortgageAmount
                      )}
                    </div>
                  </div>
                  <div className="form-group my-8 mx-8">
                    <label htmlFor="miscMortgageInterest">
                      Misc. Mortgage Interest
                    </label>
                    <div className="input-field">
                      <input
                        type="number"
                        id="miscMortgageInterest"
                        name="miscMortgageInterest"
                        value={formData.miscMortgageInterest}
                        onChange={handleInputChange}
                        className="text-text"
                      />
                      <span>%</span>
                    </div>
                    <div className="calculated-field">
                      {formatCurrency(
                        ((formData.miscMortgageAmount *
                          formData.miscMortgageInterest) /
                          100 /
                          12) *
                          formData.estimatedHoldTime
                      )}
                    </div>
                  </div>
                  <div className="form-group my-8 mx-8">
                    <label>Misc. Mortgage Monthly Interest Only Payment</label>
                    <div className="calculated-field">
                      {formatCurrency(
                        (((formData.miscMortgageAmount *
                          formData.miscMortgageInterest) /
                          100 /
                          12) *
                          formData.estimatedHoldTime) /
                          formData.estimatedHoldTime
                      )}
                    </div>
                  </div>
                  <div className="form-group my-8 mx-8">
                    <label htmlFor="miscellaneousFinancingCosts">
                      Miscellaneous Financing Costs
                    </label>
                    <div className="input-field">
                      <CurrencyInput
                        id="miscellaneousFinancingCosts"
                        name="miscellaneousFinancingCosts"
                        prefix="$"
                        placeholder="Please enter misc financing costs amount"
                        defaultValue={formData.miscellaneousFinancingCosts}
                        decimalsLimit={2}
                        className="text-text"
                        onValueChange={(value) =>
                          handleCurrencyChange(
                            "miscellaneousFinancingCosts",
                            value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group my-8 mx-8">
                    <label htmlFor="chalireFees">Chalire Fees</label>
                    <div className="input-field">
                      <CurrencyInput
                        id="chalireFees"
                        name="chalireFees"
                        prefix="$"
                        placeholder="Please enter Chalire Fees amount"
                        defaultValue={formData.chalireFees}
                        decimalsLimit={2}
                        className="text-text"
                        onValueChange={(value) =>
                          handleCurrencyChange("chalireFees", value)
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group my-8 mx-8">
                    <label>Total Cash Needed for Deal</label>
                    <div className="calculated-field">
                      {formatCurrency(formData.totalCashNeededForDeal)}
                    </div>
                  </div>
                  <div className="form-group my-8 mx-8">
                    <label>15% Interest to Lender</label>
                    <div className="calculated-field">
                      {formatCurrency(formData.totalCashNeededForDeal * 0.15)}
                    </div>
                  </div>
                  <div className="form-group my-8 mx-8">
                    <label>Total Financing Costs:</label>
                    <div className="calculated-field">
                      {formatCurrency(formData.totalFinancingCosts)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buying Transactions Costs */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("buyingTransactionsCosts")}
            >
              <h2 className="text-xl font-semibold mb-4">
                Buying Transactions Costs
              </h2>
              {openSections.buyingTransactionsCosts ? (
                <FaChevronUp className="h-5 w-5 mx-2" />
              ) : (
                <FaChevronDown className="h-5 w-5 mx-2" />
              )}
            </div>
            {openSections.buyingTransactionsCosts && (
              <div className="my-8 mx-8">
                {/* Add fields for Buying Transactions Costs */}

                <div className="my-8 mx-8 border rounded-md border-gray-300">
                  <div className="form-group my-8 mx-8">
                    <label htmlFor="escrowAttorneyFees">
                      Escrow / Attorney Fees
                    </label>

                    <CurrencyInput
                      id="escrowAttorneyFees"
                      name="escrowAttorneyFees"
                      prefix="$"
                      placeholder="Please enter escrow / attorney fees amount"
                      defaultValue={formData.escrowAttorneyFees}
                      decimalsLimit={2}
                      className="text-text "
                      onValueChange={(value) =>
                        handleCurrencyChange("escrowAttorneyFees", value)
                      }
                    />
                  </div>
                  <div className="form-group my-8 mx-8">
                    <label htmlFor="titleInsuranceSearchCostsPercentage">
                      Title Insurance / Search Costs
                    </label>
                    <div className="input-field">
                      <input
                        type="number"
                        id="titleInsuranceSearchCostsPercentage"
                        name="titleInsuranceSearchCostsPercentage"
                        value={formData.titleInsuranceSearchCostsPercentage}
                        onChange={handleInputChange}
                        className="text-text"
                      />
                      <span>%</span>
                    </div>

                    <div className="calculated-field">
                      {formatCurrency(
                        500 +
                          (formData.titleInsuranceSearchCostsPercentage / 100) *
                            formData.purchasePrice
                      )}
                    </div>
                  </div>
                  <div className="form-group my-8 mx-8">
                    <label htmlFor="firstMortgageInterest">
                      Miscellaneous Buying Costs
                    </label>
                    <div className="input-field">
                      <input
                        type="number"
                        id="miscBuyingCostsPerc"
                        name="miscBuyingCostsPerc"
                        value={formData.miscBuyingCostsPerc}
                        onChange={handleInputChange}
                        className="text-text"
                      />
                      <span>%</span>
                    </div>
                    <div className="calculated-field">
                      {formatCurrency(
                        (formData.purchasePrice *
                          formData.miscBuyingCostsPerc) /
                          100
                      )}
                    </div>
                    <label htmlFor="firstMortgageInterest">
                      Total Buying Transaction Cost
                    </label>
                    <div className="calculated-field my-8">
                      {formatCurrency(
                        formData.escrowAttorneyFees +
                          (500 +
                            (formData.titleInsuranceSearchCostsPercentage /
                              100) *
                              formData.purchasePrice) +
                          (formData.purchasePrice *
                            formData.miscBuyingCostsPerc) /
                            100
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profits */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("profits")}
            >
              <h2 className="text-xl font-semibold mb-4 text-green-400">
                Profits
              </h2>
              {openSections.profits ? (
                <FaChevronUp className="h-5 w-5 mx-2" />
              ) : (
                <FaChevronDown className="h-5 w-5 mx-2" />
              )}
            </div>
            {openSections.profits && (
              <div className="mb-8">
                {/* Add fields for Profits */}

                <div className="form-group text-green-400 text-xl my-4">
                  <label htmlFor="totalSellingTransactionCost">
                    ESTIMATED NET PROFIT
                  </label>
                  <div className="calculated-field">
                    {formatCurrency(
                      formData.afterRepairValue -
                        formData.purchasePrice -
                        formData.estimatedRepairCosts -
                        formData.totalFinancingCosts -
                        //total holding costs
                        (formData.propertyTaxesAnnually / 12 +
                          formData.hoaAndCondoFeesMonthly +
                          formData.insuranceCostsAnnually / 12 +
                          formData.gasCostsMonthly +
                          formData.electricityCostsMonthly +
                          formData.waterCostsMonthly +
                          formData.otherCostsMonthly +
                          formData.miscHoldingCosts) *
                          formData.estimatedHoldTime -
                        //total buying transaction costs
                        (formData.escrowAttorneyFees +
                          (500 +
                            (formData.titleInsuranceSearchCostsPercentage /
                              100) *
                              formData.purchasePrice) +
                          (formData.purchasePrice *
                            formData.miscBuyingCostsPerc) /
                            100) -
                        //total selling transaction cost
                        (formData.sellingEscrowAttorneyFees +
                          formData.sellingRecordingFees +
                          (formData.realtorFeePercent / 100) *
                            formData.afterRepairValue +
                          (formData.transferConveyanceFeePercentage / 100) *
                            formData.afterRepairValue +
                          formData.homeWarranty +
                          formData.stagingCosts +
                          formData.marketingCosts +
                          formData.miscSellingCosts)
                    )}
                  </div>
                </div>
                {/* <div className="form-group text-green-400 text-xl my-4">
                <label htmlFor="totalSellingTransactionCost">
                  ROI PERCENTAGE
                </label>
                <div className="calculated-field">
                  {(
                    ((formData.afterRepairValue -
                      formData.purchasePrice -
                      formData.estimatedRepairCosts -
                      (formData.totalFinancingCosts +
                        formData.chalireFees +
                        formData.miscellaneousFinancingCosts) -
                      //total holding costs
                      (formData.propertyTaxesAnnually / 12 +
                        formData.hoaAndCondoFeesMonthly +
                        formData.insuranceCostsAnnually / 12 +
                        formData.gasCostsMonthly +
                        formData.electricityCostsMonthly +
                        formData.waterCostsMonthly +
                        formData.otherCostsMonthly +
                        formData.miscHoldingCosts) *
                        formData.estimatedHoldTime -
                      //total buying transaction costs
                      (formData.escrowAttorneyFees +
                        (500 +
                          (formData.titleInsuranceSearchCostsPercentage / 100) *
                            formData.purchasePrice) +
                        (formData.purchasePrice *
                          formData.miscBuyingCostsPerc) /
                          100) -
                      //total selling transaction cost
                      (formData.sellingEscrowAttorneyFees +
                        formData.sellingRecordingFees +
                        (formData.realtorFeePercent / 100) *
                          formData.afterRepairValue +
                        (formData.transferConveyanceFeePercentage / 100) *
                          formData.afterRepairValue +
                        formData.homeWarranty +
                        formData.stagingCosts +
                        formData.marketingCosts +
                        formData.miscSellingCosts) -
                      //15% interest to lender
                      formData.totalCashNeededForDeal * 0.15) /
                      formData.totalCashNeededForDeal) *
                    100
                  ).toFixed(2) + "%"}
                </div>
              </div> */}

                <div className="form-group text-green-400 text-xl my-4">
                  <label htmlFor="totalSellingTransactionCost">
                    TOTAL COST ROI
                  </label>
                  <div className="calculated-field">
                    {
                      //estimated net profit
                      (
                        ((formData.afterRepairValue -
                          formData.purchasePrice -
                          formData.estimatedRepairCosts -
                          formData.totalFinancingCosts -
                          //total holding costs
                          (formData.propertyTaxesAnnually / 12 +
                            formData.hoaAndCondoFeesMonthly +
                            formData.insuranceCostsAnnually / 12 +
                            formData.gasCostsMonthly +
                            formData.electricityCostsMonthly +
                            formData.waterCostsMonthly +
                            formData.otherCostsMonthly +
                            formData.miscHoldingCosts) *
                            formData.estimatedHoldTime -
                          //total buying transaction costs
                          (formData.escrowAttorneyFees +
                            (500 +
                              (formData.titleInsuranceSearchCostsPercentage /
                                100) *
                                formData.purchasePrice) +
                            (formData.purchasePrice *
                              formData.miscBuyingCostsPerc) /
                              100) -
                          //total selling transaction cost
                          (formData.sellingEscrowAttorneyFees +
                            formData.sellingRecordingFees +
                            (formData.realtorFeePercent / 100) *
                              formData.afterRepairValue +
                            (formData.transferConveyanceFeePercentage / 100) *
                              formData.afterRepairValue +
                            formData.homeWarranty +
                            formData.stagingCosts +
                            formData.marketingCosts +
                            formData.miscSellingCosts)) /
                          (formData.purchasePrice +
                            formData.estimatedRepairCosts +
                            formData.totalFinancingCosts +
                            (formData.propertyTaxesAnnually / 12 +
                              formData.hoaAndCondoFeesMonthly +
                              formData.insuranceCostsAnnually / 12 +
                              formData.gasCostsMonthly +
                              formData.electricityCostsMonthly +
                              formData.waterCostsMonthly +
                              formData.otherCostsMonthly +
                              formData.miscHoldingCosts) *
                              formData.estimatedHoldTime +
                            (formData.escrowAttorneyFees +
                              (500 +
                                (formData.titleInsuranceSearchCostsPercentage /
                                  100) *
                                  formData.purchasePrice) +
                              (formData.purchasePrice *
                                formData.miscBuyingCostsPerc) /
                                100) +
                            (formData.sellingEscrowAttorneyFees +
                              formData.sellingRecordingFees +
                              (formData.realtorFeePercent / 100) *
                                formData.afterRepairValue +
                              (formData.transferConveyanceFeePercentage / 100) *
                                formData.afterRepairValue +
                              formData.homeWarranty +
                              formData.stagingCosts +
                              formData.marketingCosts +
                              formData.miscSellingCosts))) *
                        100
                      ).toFixed(2) + "%"
                    }
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Selling Transactions Costs */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("sellingTransactionsCosts")}
            >
              <h2 className="text-xl font-semibold mb-4">
                Selling Transactions Costs
              </h2>
              {openSections.sellingTransactionsCosts ? (
                <FaChevronUp className="h-5 w-5 mx-2" />
              ) : (
                <FaChevronDown className="h-5 w-5 mx-2" />
              )}
            </div>
            {openSections.sellingTransactionsCosts && (
              <div className="my-8 mx-8 border rounded-md border-gray-300">
                {/* Add fields for Selling Transactions Costs */}

                <div className="">
                  <div className="form-group my-8 mx-8 ">
                    <label htmlFor="sellingEscrowAttorneyFees">
                      Escrow / Attorney Fees
                    </label>

                    <CurrencyInput
                      id="sellingEscrowAttorneyFees"
                      name="sellingEscrowAttorneyFees"
                      prefix="$"
                      placeholder="Please enter escrow / attorney fees amount"
                      defaultValue={formData.sellingEscrowAttorneyFees}
                      decimalsLimit={2}
                      className="text-text "
                      onValueChange={(value) =>
                        handleCurrencyChange("sellingEscrowAttorneyFees", value)
                      }
                    />
                  </div>
                  <div className="form-group my-8 mx-8 ">
                    <label htmlFor="sellingRecordingFees">
                      Selling Recording Fees
                    </label>
                    <CurrencyInput
                      id="sellingRecordingFees"
                      name="sellingRecordingFees"
                      prefix="$"
                      placeholder="Please enter Selling Recording Fees amount"
                      defaultValue={formData.sellingRecordingFees}
                      decimalsLimit={2}
                      className="text-text "
                      onValueChange={(value) =>
                        handleCurrencyChange("sellingRecordingFees", value)
                      }
                    />
                  </div>
                  <div className="form-group my-8 mx-8 ">
                    <label htmlFor="realtorFeePercent">Realtor Fees</label>
                    <div className="input-field">
                      <input
                        type="number"
                        id="realtorFeePercent"
                        name="realtorFeePercent"
                        value={formData.realtorFeePercent}
                        onChange={handleInputChange}
                        className="text-text"
                      />
                      <span>%</span>
                    </div>
                    <div className="calculated-field">
                      {formatCurrency(
                        (formData.afterRepairValue *
                          formData.realtorFeePercent) /
                          100
                      )}
                    </div>
                  </div>

                  <div className="form-group my-8 mx-8 ">
                    <label htmlFor="sellingRecordingFees">
                      Transfer and Conveyance Fees
                    </label>
                    <div className="input-field">
                      <input
                        type="number"
                        id="transferConveyanceFeePercentage"
                        name="transferConveyanceFeePercentage"
                        value={formData.transferConveyanceFeePercentage}
                        onChange={handleInputChange}
                        className="text-text"
                      />
                      <span>%</span>
                      <div className="calculated-field">
                        {formatCurrency(
                          (formData.transferConveyanceFeePercentage / 100) *
                            formData.afterRepairValue
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group my-8 mx-8 ">
                    <label htmlFor="homeWarranty">Home Warranty</label>
                    <CurrencyInput
                      id="homeWarranty"
                      name="homeWarranty"
                      prefix="$"
                      placeholder="Please enter Home Warranty amount"
                      defaultValue={formData.homeWarranty}
                      decimalsLimit={2}
                      className="text-text "
                      onValueChange={(value) =>
                        handleCurrencyChange("homeWarranty", value)
                      }
                    />
                  </div>

                  <div className="form-group my-8 mx-8 ">
                    <label htmlFor="stagingCosts">Staging Costs</label>
                    <CurrencyInput
                      id="stagingCosts"
                      name="stagingCosts"
                      prefix="$"
                      placeholder="Please enter Selling Staging Costs  amount"
                      defaultValue={formData.stagingCosts}
                      decimalsLimit={2}
                      className="text-text "
                      onValueChange={(value) =>
                        handleCurrencyChange("stagingCosts", value)
                      }
                    />
                  </div>

                  <div className="form-group my-8 mx-8 ">
                    <label htmlFor="marketingCosts">Marketing Costs</label>
                    <CurrencyInput
                      id="marketingCosts"
                      name="marketingCosts"
                      prefix="$"
                      placeholder="Please enter Marketing Costs amount"
                      defaultValue={formData.marketingCosts}
                      decimalsLimit={2}
                      className="text-text "
                      onValueChange={(value) =>
                        handleCurrencyChange("marketingCosts", value)
                      }
                    />
                  </div>

                  <div className="form-group my-8 mx-8 ">
                    <label htmlFor="miscSellingCosts">
                      Miscellaneous Selling Costs
                    </label>
                    <CurrencyInput
                      id="miscSellingCosts"
                      name="miscSellingCosts"
                      prefix="$"
                      placeholder="Please enter Miscellaneous Selling Costs amount"
                      defaultValue={formData.miscSellingCosts}
                      decimalsLimit={2}
                      className="text-text "
                      onValueChange={(value) =>
                        handleCurrencyChange("miscSellingCosts", value)
                      }
                    />
                  </div>

                  <div className="form-group my-8 mx-8 ">
                    <label htmlFor="totalSellingCosts">
                      Total Selling Transaction Cost
                    </label>

                    <div className="calculated-field col-span-2">
                      {formatCurrency(
                        formData.sellingEscrowAttorneyFees +
                          formData.sellingRecordingFees +
                          (formData.realtorFeePercent / 100) *
                            formData.afterRepairValue +
                          (formData.transferConveyanceFeePercentage / 100) *
                            formData.afterRepairValue +
                          formData.homeWarranty +
                          formData.stagingCosts +
                          formData.marketingCosts +
                          formData.miscSellingCosts
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Purchase and Deal Analysis */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("purchaseDealAnalysis")}
            >
              <h2 className="text-xl font-semibold mb-4">Deal Analysis</h2>
              {openSections.purchaseDealAnalysis ? (
                <FaChevronUp className="h-5 w-5 mx-2" />
              ) : (
                <FaChevronDown className="h-5 w-5 mx-2" />
              )}
            </div>
            {openSections.purchaseDealAnalysis && (
              <div className="my-8">
                {/* Add fields for Purchase and Deal Analysis */}

                <div className="">
                  <div className="form-group ">
                    <label htmlFor="arv">AFTER REPAIR VALUE</label>
                    <div className="calculated-field ">
                      {formatCurrency(formData.afterRepairValue)}
                    </div>
                  </div>

                  <div className="form-group ">
                    <label htmlFor="purchasePrice">PURCHASE PRICE</label>
                    <div className="calculated-field">
                      {formatCurrency(formData.purchasePrice)}
                    </div>
                  </div>

                  <div className="form-group ">
                    <label htmlFor="estRepairCosts">
                      ESTIMATED REPAIR COSTS
                    </label>
                    <div className="calculated-field">
                      {formatCurrency(formData.estimatedRepairCosts)}
                    </div>
                  </div>

                  <div className="form-group ">
                    <label htmlFor="totalFinancingCosts">
                      TOTAL FINANCING COSTS
                    </label>
                    <div className="calculated-field">
                      {formatCurrency(formData.totalFinancingCosts)}
                    </div>
                  </div>

                  <div className="form-group ">
                    <label htmlFor="totalHoldingCosts">
                      TOTAL HOLDING COSTS
                    </label>
                    <div className="calculated-field">
                      {formatCurrency(
                        (formData.propertyTaxesAnnually / 12 +
                          formData.hoaAndCondoFeesMonthly +
                          formData.insuranceCostsAnnually / 12 +
                          formData.gasCostsMonthly +
                          formData.electricityCostsMonthly +
                          formData.waterCostsMonthly +
                          formData.otherCostsMonthly +
                          formData.miscHoldingCosts) *
                          formData.estimatedHoldTime
                      )}
                    </div>
                  </div>

                  <div className="form-group ">
                    <label htmlFor="totalBuyingTransactionCost">
                      TOTAL BUYING TRANSACTION COSTS
                    </label>
                    <div className="calculated-field">
                      {formatCurrency(
                        formData.escrowAttorneyFees +
                          (500 +
                            (formData.titleInsuranceSearchCostsPercentage /
                              100) *
                              formData.purchasePrice) +
                          (formData.purchasePrice *
                            formData.miscBuyingCostsPerc) /
                            100
                      )}
                    </div>
                  </div>
                  <div className="form-group ">
                    <label htmlFor="totalSellingTransactionCost">
                      TOTAL SELLING TRANSACTION COSTS
                    </label>
                    <div className="calculated-field">
                      {formatCurrency(
                        formData.sellingEscrowAttorneyFees +
                          formData.sellingRecordingFees +
                          (formData.realtorFeePercent / 100) *
                            formData.afterRepairValue +
                          (formData.transferConveyanceFeePercentage / 100) *
                            formData.afterRepairValue +
                          formData.homeWarranty +
                          formData.stagingCosts +
                          formData.marketingCosts +
                          formData.miscSellingCosts
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Potential Return & Profit Analysis */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("potentialReturnProfitAnalysis")}
            >
              <h2 className="text-xl font-semibold mb-4">
                Returns & Profit Analysis
              </h2>
              {openSections.potentialReturnProfitAnalysis ? (
                <FaChevronUp className="h-5 w-5 mx-2" />
              ) : (
                <FaChevronDown className="h-5 w-5 mx-2" />
              )}
            </div>
            {openSections.potentialReturnProfitAnalysis && (
              <div className="">
                {/* Add fields for Potential Return & Profit Analysis */}
                <div className="my-8">
                  {/* Add fields for Purchase and Deal Analysis */}

                  <div className="">
                    <div className="form-group ">
                      <label htmlFor="assumeSaleIsOnOrBefore">
                        ASSUMES SALE IS ON OR BEFORE
                      </label>
                      <div className="calculated-field ">
                        {addMonthsToDate(
                          formData.date,
                          formData.estimatedHoldTime
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="form-group ">
                      <label htmlFor="purchasePlusEstimatedRepairCostsPerSqFt">
                        Purchase + Estimated Repair Cost Per Sq Ft.
                      </label>
                      <div className="calculated-field ">
                        {formatCurrency(
                          (formData.purchasePrice +
                            formData.estimatedRepairCosts) /
                            formData.totalSqFootage
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="form-group ">
                      <label htmlFor="downPaymentRequiredAtClosing">
                        Down Payment Required at Closing
                      </label>
                      <div className="calculated-field ">
                        {formatCurrency(
                          //purchase & repair costs
                          formData.purchasePrice +
                            formData.estimatedRepairCosts -
                            //first mortgage lien amount
                            formData.firstMortgageAmount -
                            // second mortgage lien amount
                            formData.secondMortgageAmount
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="form-group ">
                      <label htmlFor="myCommittedCapital">
                        My Committed Capital
                      </label>
                      <div className="calculated-field ">
                        {formatCurrency(
                          //this part is till H42
                          //purchase price
                          formData.purchasePrice +
                            //estimated repair costs below
                            formData.estimatedRepairCosts +
                            // first mortgage points below
                            (formData.firstMortgagePoints / 100) *
                              formData.firstMortgageAmount +
                            (formData.secondMortgagePoints / 100) *
                              formData.secondMortgageAmount +
                            formData.miscMortgagePoints +
                            //total holding costs below
                            (formData.propertyTaxesAnnually / 12 +
                              formData.hoaAndCondoFeesMonthly +
                              formData.insuranceCostsAnnually / 12 +
                              formData.gasCostsMonthly +
                              formData.electricityCostsMonthly +
                              formData.waterCostsMonthly +
                              formData.otherCostsMonthly +
                              formData.miscHoldingCosts) *
                              formData.estimatedHoldTime +
                            //total buying transactions costs below

                            (formData.escrowAttorneyFees +
                              (500 +
                                (formData.titleInsuranceSearchCostsPercentage /
                                  100) *
                                  formData.purchasePrice) +
                              (formData.purchasePrice *
                                formData.miscBuyingCostsPerc) /
                                100) +
                            formData.stagingCosts +
                            formData.miscSellingCosts +
                            formData.marketingCosts -
                            (formData.firstMortgageAmount -
                              formData.secondMortgageAmount -
                              formData.miscMortgageAmount)
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="form-group ">
                      <label htmlFor="myAnnualisedCashOnCashReturn">
                        My Annualised Cash on Cash Return
                      </label>
                      <div className="calculated-field ">
                        {
                          // Estimated Net Profit / My Committed Capital * 12 / Estimated Hold Time = % in percentage

                          //estimated net profit

                          (((formData.afterRepairValue -
                            formData.purchasePrice -
                            formData.estimatedRepairCosts -
                            formData.totalFinancingCosts -
                            //total holding costs
                            (formData.propertyTaxesAnnually / 12 +
                              formData.hoaAndCondoFeesMonthly +
                              formData.insuranceCostsAnnually / 12 +
                              formData.gasCostsMonthly +
                              formData.electricityCostsMonthly +
                              formData.waterCostsMonthly +
                              formData.otherCostsMonthly +
                              formData.miscHoldingCosts) *
                              formData.estimatedHoldTime -
                            //total buying transaction costs
                            (formData.escrowAttorneyFees +
                              (500 +
                                (formData.titleInsuranceSearchCostsPercentage /
                                  100) *
                                  formData.purchasePrice) +
                              (formData.purchasePrice *
                                formData.miscBuyingCostsPerc) /
                                100) -
                            //total selling transaction cost
                            (formData.sellingEscrowAttorneyFees +
                              formData.sellingRecordingFees +
                              (formData.realtorFeePercent / 100) *
                                formData.afterRepairValue +
                              (formData.transferConveyanceFeePercentage / 100) *
                                formData.afterRepairValue +
                              formData.homeWarranty +
                              formData.stagingCosts +
                              formData.marketingCosts +
                              formData.miscSellingCosts)) / //purchase price
                            //my committed capital
                            //this part is till H42
                            (formData.purchasePrice +
                              //estimated repair costs below
                              formData.estimatedRepairCosts +
                              // first mortgage points below
                              (formData.firstMortgagePoints / 100) *
                                formData.firstMortgageAmount +
                              (formData.secondMortgagePoints / 100) *
                                formData.secondMortgageAmount +
                              formData.miscMortgagePoints +
                              //total holding costs below
                              (formData.propertyTaxesAnnually / 12 +
                                formData.hoaAndCondoFeesMonthly +
                                formData.insuranceCostsAnnually / 12 +
                                formData.gasCostsMonthly +
                                formData.electricityCostsMonthly +
                                formData.waterCostsMonthly +
                                formData.otherCostsMonthly +
                                formData.miscHoldingCosts) *
                                formData.estimatedHoldTime +
                              //total buying transactions costs below

                              (formData.escrowAttorneyFees +
                                (500 +
                                  (formData.titleInsuranceSearchCostsPercentage /
                                    100) *
                                    formData.purchasePrice) +
                                (formData.purchasePrice *
                                  formData.miscBuyingCostsPerc) /
                                  100) +
                              formData.stagingCosts +
                              formData.miscSellingCosts +
                              formData.marketingCosts -
                              (formData.firstMortgageAmount -
                                formData.secondMortgageAmount -
                                formData.miscMortgageAmount))) *
                            12) /
                            formData.estimatedHoldTime >
                          0
                            ? // Estimated Net Profit / My Committed Capital * 12 / Estimated Hold Time = % in percentage

                              //estimated net profit

                              (
                                ((((formData.afterRepairValue -
                                  formData.purchasePrice -
                                  formData.estimatedRepairCosts -
                                  formData.totalFinancingCosts -
                                  //total holding costs
                                  (formData.propertyTaxesAnnually / 12 +
                                    formData.hoaAndCondoFeesMonthly +
                                    formData.insuranceCostsAnnually / 12 +
                                    formData.gasCostsMonthly +
                                    formData.electricityCostsMonthly +
                                    formData.waterCostsMonthly +
                                    formData.otherCostsMonthly +
                                    formData.miscHoldingCosts) *
                                    formData.estimatedHoldTime -
                                  //total buying transaction costs
                                  (formData.escrowAttorneyFees +
                                    (500 +
                                      (formData.titleInsuranceSearchCostsPercentage /
                                        100) *
                                        formData.purchasePrice) +
                                    (formData.purchasePrice *
                                      formData.miscBuyingCostsPerc) /
                                      100) -
                                  //total selling transaction cost
                                  (formData.sellingEscrowAttorneyFees +
                                    formData.sellingRecordingFees +
                                    (formData.realtorFeePercent / 100) *
                                      formData.afterRepairValue +
                                    (formData.transferConveyanceFeePercentage /
                                      100) *
                                      formData.afterRepairValue +
                                    formData.homeWarranty +
                                    formData.stagingCosts +
                                    formData.marketingCosts +
                                    formData.miscSellingCosts)) / //purchase price
                                  //my committed capital
                                  //this part is till H42
                                  (formData.purchasePrice +
                                    //estimated repair costs below
                                    formData.estimatedRepairCosts +
                                    // first mortgage points below
                                    (formData.firstMortgagePoints / 100) *
                                      formData.firstMortgageAmount +
                                    (formData.secondMortgagePoints / 100) *
                                      formData.secondMortgageAmount +
                                    formData.miscMortgagePoints +
                                    //total holding costs below
                                    (formData.propertyTaxesAnnually / 12 +
                                      formData.hoaAndCondoFeesMonthly +
                                      formData.insuranceCostsAnnually / 12 +
                                      formData.gasCostsMonthly +
                                      formData.electricityCostsMonthly +
                                      formData.waterCostsMonthly +
                                      formData.otherCostsMonthly +
                                      formData.miscHoldingCosts) *
                                      formData.estimatedHoldTime +
                                    //total buying transactions costs below

                                    (formData.escrowAttorneyFees +
                                      (500 +
                                        (formData.titleInsuranceSearchCostsPercentage /
                                          100) *
                                          formData.purchasePrice) +
                                      (formData.purchasePrice *
                                        formData.miscBuyingCostsPerc) /
                                        100) +
                                    formData.stagingCosts +
                                    formData.miscSellingCosts +
                                    formData.marketingCosts -
                                    (formData.firstMortgageAmount -
                                      formData.secondMortgageAmount -
                                      formData.miscMortgageAmount))) *
                                  12) /
                                  formData.estimatedHoldTime) *
                                100
                              ).toFixed(2)
                            : 0
                        }
                        %
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="form-group ">
                      <label htmlFor="totalAnnualisedCashOnReturn">
                        Total Annualised Cash on Return
                      </label>
                      <div className="calculated-field ">
                        {
                          //TOTAL COST ROI * (12/ESTIMATED HOLD TIME [MONTHS])

                          //Total Cost ROI
                          //estimated net profit
                          ((formData.afterRepairValue -
                            formData.purchasePrice -
                            formData.estimatedRepairCosts -
                            formData.totalFinancingCosts -
                            //total holding costs
                            (formData.propertyTaxesAnnually / 12 +
                              formData.hoaAndCondoFeesMonthly +
                              formData.insuranceCostsAnnually / 12 +
                              formData.gasCostsMonthly +
                              formData.electricityCostsMonthly +
                              formData.waterCostsMonthly +
                              formData.otherCostsMonthly +
                              formData.miscHoldingCosts) *
                              formData.estimatedHoldTime -
                            //total buying transaction costs
                            (formData.escrowAttorneyFees +
                              (500 +
                                (formData.titleInsuranceSearchCostsPercentage /
                                  100) *
                                  formData.purchasePrice) +
                              (formData.purchasePrice *
                                formData.miscBuyingCostsPerc) /
                                100) -
                            //total selling transaction cost
                            (formData.sellingEscrowAttorneyFees +
                              formData.sellingRecordingFees +
                              (formData.realtorFeePercent / 100) *
                                formData.afterRepairValue +
                              (formData.transferConveyanceFeePercentage / 100) *
                                formData.afterRepairValue +
                              formData.homeWarranty +
                              formData.stagingCosts +
                              formData.marketingCosts +
                              formData.miscSellingCosts)) /
                            (formData.purchasePrice +
                              formData.estimatedRepairCosts +
                              formData.totalFinancingCosts +
                              (formData.propertyTaxesAnnually / 12 +
                                formData.hoaAndCondoFeesMonthly +
                                formData.insuranceCostsAnnually / 12 +
                                formData.gasCostsMonthly +
                                formData.electricityCostsMonthly +
                                formData.waterCostsMonthly +
                                formData.otherCostsMonthly +
                                formData.miscHoldingCosts) *
                                formData.estimatedHoldTime +
                              (formData.escrowAttorneyFees +
                                (500 +
                                  (formData.titleInsuranceSearchCostsPercentage /
                                    100) *
                                    formData.purchasePrice) +
                                (formData.purchasePrice *
                                  formData.miscBuyingCostsPerc) /
                                  100) +
                              (formData.sellingEscrowAttorneyFees +
                                formData.sellingRecordingFees +
                                (formData.realtorFeePercent / 100) *
                                  formData.afterRepairValue +
                                (formData.transferConveyanceFeePercentage /
                                  100) *
                                  formData.afterRepairValue +
                                formData.homeWarranty +
                                formData.stagingCosts +
                                formData.marketingCosts +
                                formData.miscSellingCosts))) *
                            100 *
                            (12 / formData.estimatedHoldTime) *
                            100
                        }
                        %
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <button
          onClick={handleCancel}
          className="px-4 py-2 mr-4 text-gray-600 border border-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          className={`px-4 py-2 text-white bg-blue-600 rounded ${
            saving ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
      <ToastContainer/>
    </div>

    
  );
};

export default DealFormDynamic;
