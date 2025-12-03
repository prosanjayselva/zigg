import React, { useRef, useState } from "react";
import "./Home.css";

const Home = () => {
  const formRef = useRef(null);

  const [price, setPrice] = useState();
  const [errors, setErrors] = useState({});

  const mattype = ["SS", "MS", "SPRING STEEL", "AL", "BRASS", "GI"];

  const matthickness = [
    1, 1.2, 1.5, 1.6, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 14, 16, 0.1, 0.2, 0.3, 0.4,
    0.5, 0.6, 0.7, 0.8, 0.9,
  ];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    remarks: "",
    materialtype: "",
    materialthick: "",
    materialowner: "",
    response: "No",
    matss304: "No",
    matss202: "No",
    materiallen: "",
    materialwid: "",
    runMeter: "",
    pricing: "",
    noOfSheets: "",
    designer: "",
    materialcast: "",
    foldingcast: "",
    transfortcost: "",
  });

  const clearForm = (e) => {
    e.preventDefault();
    if (formRef.current) {
      formRef.current.reset();
    }
    setFormData({
      name: "",
      phone: "",
      date: "",
      remarks: "",
      materialtype: "",
      materialthick: "",
      materialowner: "",
      response: "No",
      matss304: "No",
      matss202: "No",
      materiallen: "",
      materialwid: "",
      runMeter: "",
      pricing: "",
      noOfSheets: "",
      designer: "",
      materialcast: "",
      foldingcast: "",
      transfortcost: "",
    });
    setPrice(undefined);
    setErrors({});
  };

  const clearFieldError = (name) => {
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Normal text/select handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    clearFieldError(name);
  };

  // Phone: only digits, max 10
  const handlePhoneChange = (e) => {
    let { value } = e.target;
    value = value.replace(/\D/g, ""); // remove non-digits
    if (value.length > 10) value = value.slice(0, 10);
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
    clearFieldError("phone");
  };

  // Integer-only fields (no decimal, no leading zeros except single 0)
  const handleIntegerChange = (e) => {
    const { name } = e.target;
    let value = e.target.value;

    // keep digits only
    value = value.replace(/\D/g, "");

    // strip leading zeros when more than 1 digit
    if (value.length > 1) {
      value = value.replace(/^0+/, "");
      if (value === "") value = "0";
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    clearFieldError(name);
  };

  // Decimal-allowed (for runMeter)
  const handleDecimalChange = (e) => {
    const { name } = e.target;
    let value = e.target.value;

    // allow digits and dot
    value = value.replace(/[^0-9.]/g, "");

    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }

    let [intPart, decPart] = value.split(".");

    if (intPart && intPart.length > 1) {
      intPart = intPart.replace(/^0+/, "");
      if (intPart === "") intPart = "0";
    }

    value = decPart !== undefined ? `${intPart}.${decPart}` : intPart || "";

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    clearFieldError(name);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Customer name is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!formData.date) {
      newErrors.date = "Estimated delivery date is required.";
    }

    if (!formData.remarks.trim()) {
      newErrors.remarks = "Order remarks are required.";
    }

    if (!formData.materialtype) {
      newErrors.materialtype = "Please select a material type.";
    }
    if (!formData.materialthick) {
      newErrors.materialthick = "Please select thickness.";
    }
    if (!formData.materialowner) {
      newErrors.materialowner = "Please select material owner.";
    }

    const materiallen = Number(formData.materiallen);
    if (formData.materiallen === "") {
      newErrors.materiallen = "Material length is required.";
    } else if (isNaN(materiallen) || materiallen <= 0) {
      newErrors.materiallen = "Enter a valid length (> 0).";
    }

    const materialwid = Number(formData.materialwid);
    if (formData.materialwid === "") {
      newErrors.materialwid = "Material width is required.";
    } else if (isNaN(materialwid) || materialwid <= 0) {
      newErrors.materialwid = "Enter a valid width (> 0).";
    }

    const runMeter = Number(formData.runMeter);
    if (formData.runMeter === "") {
      newErrors.runMeter = "Running meter is required.";
    } else if (isNaN(runMeter) || runMeter <= 0) {
      newErrors.runMeter = "Enter a valid running meter (> 0).";
    }

    const pricing = Number(formData.pricing);
    if (formData.pricing === "") {
      newErrors.pricing = "Pricing (no. of pierce) is required.";
    } else if (isNaN(pricing) || pricing < 0) {
      newErrors.pricing = "Enter a valid pricing (>= 0).";
    }

    const noOfSheets = Number(formData.noOfSheets);
    if (formData.noOfSheets === "") {
      newErrors.noOfSheets = "No. of sheets is required.";
    } else if (isNaN(noOfSheets) || noOfSheets <= 0) {
      newErrors.noOfSheets = "Enter valid sheets count (> 0).";
    }

    if (!formData.designer) {
      newErrors.designer = "Please select a designer.";
    }

    const materialcast = Number(formData.materialcast);
    if (formData.materialcast === "") {
      newErrors.materialcast = "Material cost is required.";
    } else if (isNaN(materialcast) || materialcast < 0) {
      newErrors.materialcast = "Enter valid material cost (>= 0).";
    }

    const foldingcast = Number(formData.foldingcast);
    if (formData.foldingcast === "") {
      newErrors.foldingcast = "Folding cost is required.";
    } else if (isNaN(foldingcast) || foldingcast < 0) {
      newErrors.foldingcast = "Enter valid folding cost (>= 0).";
    }

    const transfortcost = Number(formData.transfortcost);
    if (formData.transfortcost === "") {
      newErrors.transfortcost = "Transport cost is required.";
    } else if (isNaN(transfortcost) || transfortcost < 0) {
      newErrors.transfortcost = "Enter valid transport cost (>= 0).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const thickk = Number(formData.materialthick);
    const runmeter = Number(formData.runMeter);
    const pierce = Number(formData.pricing);
    const sheet = Number(formData.noOfSheets);
    const fold = Number(formData.foldingcast);
    const matcost = Number(formData.materialcast);
    const transcost = Number(formData.transfortcost);
    const stricker = formData.response;
    const checkk = formData.materialtype;

    let runmetercost = 0;
    let piercecost = 0;

    switch (checkk) {
      case "SS":
      case "SS 304":
      case "SS 202":
      case "SS 316":
      case "GI":
      case "SPRING STEEL":
        if (stricker === "Yes") {
          if (thickk <= 1) {
            runmetercost = 24;
          } else {
            runmetercost = thickk * 12 + 12;
          }
        } else {
          if (thickk <= 1) {
            runmetercost = 12;
          } else {
            runmetercost = thickk * 12;
          }
        }
        break;

      case "MS":
        if (thickk < 2) {
          runmetercost = 10;
        } else {
          runmetercost = thickk * 6;
        }
        break;

      case "AL":
      case "BRASS":
        if (thickk <= 1) {
          runmetercost = 20;
        } else {
          runmetercost = thickk * 20;
        }
        break;

      default:
        alert("Unknown material type selected.");
        return;
    }

    if (thickk <= 2) {
      piercecost = 1;
    } else {
      piercecost = thickk / 2;
    }

    const finalamount =
      (runmeter * runmetercost + pierce * piercecost) * sheet +
      fold +
      transcost +
      matcost;

    let result = finalamount;
    const sum = finalamount % 50;

    if (finalamount < 300) {
      result = 300;
    } else if (sum <= 10) {
      result = finalamount - sum;
    } else {
      result = finalamount - sum + 50;
    }

    setPrice(result);

    try {
      const userRes = await fetch("http://localhost:4000/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, price: result }),
      });

      if (!userRes.ok) {
        alert("Failed to save user!");
        return;
      }

      const quotationRes = await fetch(
        "http://localhost:4000/users-to-quotation",
        {
          method: "POST",
        }
      );

      if (!quotationRes.ok) {
        alert("Failed to move data to quotation!");
        return;
      }

      alert("Saved Successfully!");

      if (formRef.current) {
        formRef.current.reset();
      }
      setFormData({
        name: "",
        phone: "",
        date: "",
        remarks: "",
        materialtype: "",
        materialthick: "",
        materialowner: "",
        response: "No",
        matss304: "No",
        matss202: "No",
        materiallen: "",
        materialwid: "",
        runMeter: "",
        pricing: "",
        noOfSheets: "",
        designer: "",
        materialcast: "",
        foldingcast: "",
        transfortcost: "",
      });
      setErrors({});
    } catch (error) {
      console.error("ERROR:", error);
      alert("Something went wrong!");
    }
  };

  // helper to block e/E/+/- and optionally dot
  const blockInvalidKeys = (e, allowDot = false) => {
    const invalid = ["e", "E", "+", "-"];
    if (!allowDot) invalid.push(".");
    if (invalid.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="overallhome">
      {/* LEFT SIDE */}
      <div className="homeleft">
        <h1>Order Book</h1>
        <button type="button">Entry Quotation</button>

        <form ref={formRef}>
          <label>Customer Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error-text">{errors.name}</span>}

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your Number"
            value={formData.phone}
            onChange={handlePhoneChange}
            maxLength={10}
            required
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}

          <label>Estimated Delivery Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          {errors.date && <span className="error-text">{errors.date}</span>}

          <label>Order Remarks</label>
          <textarea
            name="remarks"
            placeholder="Add Order remarks here.."
            value={formData.remarks}
            onChange={handleChange}
            required
          ></textarea>
          {errors.remarks && (
            <span className="error-text">{errors.remarks}</span>
          )}

          <button type="button" className="clearr" onClick={clearForm}>
            Clear
          </button>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="homeright">
        <form onSubmit={handleSubmit}>
          <h3>Material Data</h3>

          <div className="row1">
            <div className="column1">
              <label>Material Type</label>
              <select
                name="materialtype"
                value={formData.materialtype}
                onChange={handleChange}
                required
              >
                <option value="">Select here</option>
                {mattype.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.materialtype && (
                <span className="error-text">{errors.materialtype}</span>
              )}
            </div>

            <div className="column1">
              <label>Material Thickness</label>
              <select
                name="materialthick"
                value={formData.materialthick}
                onChange={handleChange}
                required
              >
                <option value="">Select here</option>
                {matthickness.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.materialthick && (
                <span className="error-text">{errors.materialthick}</span>
              )}
            </div>

            <div className="column1">
              <label>Material Owner</label>
              <select
                name="materialowner"
                value={formData.materialowner}
                onChange={handleChange}
                required
              >
                <option value="">Select here</option>
                <option value="Customer">Customer</option>
                <option value="Zigaa">Zigaa</option>
              </select>
              {errors.materialowner && (
                <span className="error-text">{errors.materialowner}</span>
              )}
            </div>

            <div className="column1">
              <label htmlFor="">Sticker</label>
              <label className="switch">
                <input
                  type="checkbox"
                  name="response"
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "response",
                        value: e.target.checked ? "Yes" : "No",
                      },
                    })
                  }
                />
                <span className="slider"></span>
              </label>
              <span style={{ marginLeft: "10px" }}>
                {formData.response === "Yes" ? "Yes" : "No"}
              </span>
            </div>

            <div className="column1">
              <label htmlFor="">SS 304</label>
              <label className="switch">
                <input
                  type="checkbox"
                  name="matss304"
                  checked={formData.matss304 === "Yes"}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "matss304",
                        value: e.target.checked ? "Yes" : "No",
                      },
                    })
                  }
                />
                <span className="slider slider2"></span>
              </label>
            </div>

            <div className="column1">
              <label htmlFor="">SS 202</label>
              <label className="switch">
                <input
                  type="checkbox"
                  name="matss202"
                  checked={formData.matss202 === "Yes"}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "matss202",
                        value: e.target.checked ? "Yes" : "No",
                      },
                    })
                  }
                />
                <span className="slider slider2"></span>
              </label>
            </div>
          </div>

          <div className="row1">
            <div className="column2">
              <label>Material Length:</label>
              <input
                type="number"
                name="materiallen"
                placeholder="Enter Material Length"
                value={formData.materiallen}
                onChange={handleIntegerChange}
                onKeyDown={(e) => blockInvalidKeys(e, false)}
                required
              />
              {errors.materiallen && (
                <span className="error-text">{errors.materiallen}</span>
              )}
            </div>

            <div className="column2">
              <label>Material Width:</label>
              <input
                type="number"
                name="materialwid"
                placeholder="Enter Material Width"
                value={formData.materialwid}
                onChange={handleIntegerChange}
                onKeyDown={(e) => blockInvalidKeys(e, false)}
                required
              />
              {errors.materialwid && (
                <span className="error-text">{errors.materialwid}</span>
              )}
            </div>
          </div>

          <h3>Cutting Details</h3>

          <div className="row1">
            <div className="column">
              <label>Running Meter</label>
              <input
                type="number"
                name="runMeter"
                placeholder="Enter Running Meter"
                value={formData.runMeter}
                onChange={handleDecimalChange}
                onKeyDown={(e) => blockInvalidKeys(e, true)}
                required
              />
              {errors.runMeter && (
                <span className="error-text">{errors.runMeter}</span>
              )}
            </div>

            <div className="column">
              <label>Pricing</label>
              <input
                type="number"
                name="pricing"
                placeholder="Enter Pricing"
                value={formData.pricing}
                onChange={handleIntegerChange}
                onKeyDown={(e) => blockInvalidKeys(e, false)}
                required
              />
              {errors.pricing && (
                <span className="error-text">{errors.pricing}</span>
              )}
            </div>

            <div className="column">
              <label>No. of Sheets</label>
              <input
                type="number"
                name="noOfSheets"
                placeholder="Enter No. of Sheets"
                value={formData.noOfSheets}
                onChange={handleIntegerChange}
                onKeyDown={(e) => blockInvalidKeys(e, false)}
                required
              />
              {errors.noOfSheets && (
                <span className="error-text">{errors.noOfSheets}</span>
              )}
            </div>

            <div className="column1">
              <label>Designer</label>
              <select
                name="designer"
                value={formData.designer}
                onChange={handleChange}
                required
              >
                <option value="">Select here</option>
                <option value="Ganesh">Ganesh</option>
                <option value="Selva">Selva</option>
                <option value="Karthick">Karthick</option>
              </select>
              {errors.designer && (
                <span className="error-text">{errors.designer}</span>
              )}
            </div>
          </div>

          <h3>Other Cost</h3>

          <div className="row1">
            <div className="column">
              <label>Materialcost</label>
              <input
                type="number"
                name="materialcast"
                placeholder="0"
                value={formData.materialcast}
                onChange={handleIntegerChange}
                onKeyDown={(e) => blockInvalidKeys(e, false)}
                required
              />
              {errors.materialcast && (
                <span className="error-text">{errors.materialcast}</span>
              )}
            </div>

            <div className="column">
              <label>Folding cost</label>
              <input
                type="number"
                name="foldingcast"
                placeholder="0"
                value={formData.foldingcast}
                onChange={handleIntegerChange}
                onKeyDown={(e) => blockInvalidKeys(e, false)}
                required
              />
              {errors.foldingcast && (
                <span className="error-text">{errors.foldingcast}</span>
              )}
            </div>

            <div className="column">
              <label>Transfort cost</label>
              <input
                type="number"
                name="transfortcost"
                placeholder="0"
                value={formData.transfortcost}
                onChange={handleIntegerChange}
                onKeyDown={(e) => blockInvalidKeys(e, false)}
                required
              />
              {errors.transfortcost && (
                <span className="error-text">{errors.transfortcost}</span>
              )}
            </div>
          </div>

          {price !== undefined && (
            <div className="price-display">Final Price: {price}</div>
          )}

          <button type="submit" id="btnClick">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
