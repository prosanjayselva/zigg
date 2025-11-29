import React, { useEffect, useRef, useState } from "react";
import "./Home.css";


const Home = () => {
  // Step 1: Create a reference for the form
  const formRef = useRef(null);

  // Step 2: Define the clear function
  const clearForm = (e) => {
    e.preventDefault();
    formRef.current.reset();
    setFormData({
      name: "",
      phone: "",
      date: "",
      remarks: "",
      materialtype: "",
      materialthick: "",
      materialowner: "",
      materiallen: "",
      materialwid: "",
      runMeter: "",
      pricing: "",
      quantity: "",
      noOfSheets: "",
      designer: "",
      otherCast: "",
      minimumCast: ""
    });
  };



  const mattype = [
    "SS",
    "MS",
    "SPRING STEEL",
    "AL",
    "BRASS",
    "GI",
    "SS 304",
    "SS 202",
    "SS 316"
  ];

  const matthickness = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.2, 1.5, 1.6, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 14, 16];

  const coddata = ["AAA", "BBB", "CCC"];

  const cutdata = ["Running Meter", "Pricing", "Quantity", "No.of sheets"]


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    remarks: "",
    materialtype: "",
    materialthick: "",
    materialowner: "",
    response: "",
    materiallen: "",
    materialwid: "",
    runMeter: "",
    pricing: "",
    noOfSheets: "",
    designer: "",
    materialcast: "",
    foldingcast: "",
    transfortcost: ""
  });

  const [user, setuser] = useState([]);
  const [answer, setAnswer] = useState("");

  // const [error, seterror] = useState("")

  const [price, setprice] = useState();

  const handleChange = (e) => {


    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });


  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkk = formData.materialtype;
    const thickk = formData.materialthick;
    console.log(checkk, thickk);
    let runmetercost;
    const runmeter = formData.runMeter;
    const pierce = formData.pricing;
    let piercecost;
    const sheet = formData.noOfSheets;
    const stricker = formData.response;
    const fold=Number(formData.foldingcast);
    const matcost=Number(formData.materialcast);
    const transcost=Number(formData.transfortcost);
    switch (checkk) {
      // ✅ Group all SS types in a single case
      case "SS":
      case "SS 304":
      case "SS 202":
      case "SS 316":
      case "GI":
      case "SPRING STEEL":
        if (stricker == "Yes") {
          if (thickk <= 1) {
            runmetercost = 24;
          }
          else if (thickk > 1) {
            runmetercost = (thickk * 12) + 12;
          }
        }
        else if (stricker == "No") {
          if (thickk <= 1) {
            runmetercost = 12;
          }
          else if (thickk > 1) {
            runmetercost = thickk * 12
          }
        }

        break;

      case "MS":
        if (thickk < 2) {
          runmetercost = 10;
        }
        else if (thickk >= 2) {
          runmetercost = thickk * 6;
        }

        break;

      case "AL":
      case "BRASS":
        if (thickk <= 1) {
          runmetercost = 20;
        }
        else if (thickk > 1) {
          runmetercost = thickk * 20;
        }

        break;

      default:
        console.log("Unknown material ❓");
        break;
    }
    if (thickk <=2) {
      piercecost = 1;

    }
    else if (thickk > 2) {
      piercecost = (thickk / 2);

    }
    console.log("Stricker value:", stricker);
    console.log("Run meter:", runmeter);
    console.log("Running meter cost:", runmetercost);
    console.log(`No.pierce: ${pierce}`)
    console.log(`piercecost is: ${piercecost}`);
    console.log("NO.of sheet", sheet);
    console.log("folding:", formData.foldingcast);

    const finalamout = (((runmeter * runmetercost) + (pierce * piercecost)) * sheet) + fold+transcost+matcost;
    console.log((((runmeter * runmetercost) + (pierce * piercecost)) * sheet) + fold+transcost+matcost);
    console.log("Final price is :", finalamout);


    //Mathematical logic here 
    let sum = finalamout % 50;
    let result;
    if (finalamout < 300) {
      setprice(300);
    }
    else if (sum <= 10) {
      result = finalamout - sum;
      setprice(result)
    }
    else if (sum > 10) {
      result = finalamout - sum + 50;
      setprice(result)

    }


    // Main code 
    setuser([...user, formData]);



    setFormData({
      name: "",
      phone: "",
      date: "",
      remarks: "",
      materialtype: "",
      materialthick: "",
      materialowner: "",
      response: "",
      materiallen: "",
      materialwid: "",
      runMeter: "",
      pricing: "",
      noOfSheets: "",
      designer: "",
      materialcast: "",
      foldingcast: "",
      transfortcost: ""
    });
  }

  useEffect(() => {
    console.log("Billing software price method:", price)
    console.log("Entire data:", user);
  }, [user]);



  return (
    <div className="overallhome">
      <div className="homeleft">
        <h1>Order Book</h1>
        <button>Entry Quotation</button>

        <form ref={formRef}>
          <label>Customer Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <label>Estimated Delivery Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <label>Order Remarks</label>
          <textarea
            name="remarks"
            placeholder="Add Order remarks here.."
            value={formData.remarks}
            onChange={handleChange}
          ></textarea>

          <button type="button" className="clearr" onClick={clearForm}>
            Clear
          </button>
        </form>
      </div>

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
              >
                <option value="">Select here</option>
                {mattype.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="column1">
              <label>Material Thickness</label>
              <select
                name="materialthick"
                value={formData.materialthick}
                onChange={handleChange}
              >
                <option value="">Select here</option>
                {matthickness.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="column1">
              <label>Material Owner</label>
              <select
                name="materialowner"
                value={formData.materialowner}
                onChange={handleChange}
              >
                <option value="">Select here</option>
                <option value="Customer">Customer</option>
                <option value="Zigaa">Zigaa</option>
              </select>
            </div>

            {/* Stricker like turn on or turn off  */}

            <div className="column1">
              <label htmlFor="">Sticker</label>
              <label className="switch">
                <input
                  type="checkbox"
                  name="response"
                  checked={formData.response === "Yes"}
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





          </div>

          <div className="row1">
            <div className="column2">
              <label>Material Length:</label>
              <input
                type="number"
                name="materiallen"
                placeholder="Enter Material Length"
                value={formData.materiallen}
                onChange={handleChange}
              />
            </div>

            <div className="column2">
              <label>Material Width:</label>
              <input
                type="number"
                name="materialwid"
                placeholder="Enter Material Width"
                value={formData.materialwid}
                onChange={handleChange}
              />
            </div>
          </div>

          <h3>Cutting Details</h3>

          <div className="row1">
            <div className="column">
              <label>Running Meter</label>
              <input
                type="text"
                name="runMeter"
                placeholder="Enter Running Meter"
                value={formData.runMeter}
                onChange={handleChange}
              />
            </div>

            <div className="column">
              <label>Pricing</label>
              <input
                type="text"
                name="pricing"
                placeholder="Enter Pricing"
                value={formData.pricing}
                onChange={handleChange}
              />
            </div>



            <div className="column">
              <label>No. of Sheets</label>
              <input
                type="text"
                name="noOfSheets"
                placeholder="Enter No. of Sheets"
                value={formData.noOfSheets}
                onChange={handleChange}
              />
            </div>

            <div className="column1">
              <label>Designer</label>
              <select
                name="designer"
                value={formData.designer}
                onChange={handleChange}
              >
                <option value="">Select here</option>
                <option value="Ganesh">Ganesh</option>
                <option value="Selva">Selva</option>
                <option value="Karthick">Karthick</option>
              </select>
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
                onChange={handleChange}
              />
            </div>

            <div className="column">
              <label>Folding cost</label>
              <input
                type="number"
                name="foldingcast"
                placeholder="0"
                value={formData.foldingcast}
                onChange={handleChange}
              />
            </div>
            <div className="column">
              <label>Transfort cost</label>
              <input
                type="number"
                name="transfortcost"
                placeholder="0"
                value={formData.transfortcost}
                onChange={handleChange}
              />
            </div>




          </div>

          {price}

          <button type="submit" id="btnClick">
            Submit
          </button>
        </form>
      </div >
    </div >
  );
}

export default Home;
