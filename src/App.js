import { useState } from "react";
import { Scatter } from "react-chartjs-2";
import "chart.js/auto";
import background from "./image.svg";
import { inject } from "@vercel/analytics";

inject();

const App = () => {
  const [value1, setValue1] = useState("low");
  const [effort1, setEffort1] = useState("sm");
  const [feature1, setFeature1] = useState("feature1");
  const [value2, setValue2] = useState("high");
  const [effort2, setEffort2] = useState("large-xl");
  const [feature2, setFeature2] = useState("feature2");

  const data = {
    datasets: [
      {
        label: "Value / Effort Chart",
        data: [
          { x: 1, y: 1, label: "sm_low" },
          {
            x: 1,
            y: 2,
            label: "sm_high",
          },
          { x: 2, y: 1, label: "large-xl_low" },
          { x: 2, y: 2, label: "large-xl_high" },
        ],
        borderColor: "#4cccff",
        borderWidth: 2, //doesn't show lines
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        min: 0,
        max: 3,
        title: {
          display: true,
          text: "Effort",
        },
        ticks: {
          callback: function (value, index, values) {
            return ["", "Small-Medium", "Large-XL"][value];
          },
        },
      },
      y: {
        type: "linear",
        min: 0,
        max: 3,
        title: {
          display: true,
          text: "Value",
        },
        ticks: {
          callback: function (value, index, values) {
            return ["", "Low", "High"][value];
          },
        },
      },
    },
  };

  const handleChangeValue1 = (event) => {
    setValue1(event.target.value);
  };

  const handleChangeEffort1 = (event) => {
    setEffort1(event.target.value);
  };

  const handleChangeFeature1 = (event) => {
    setFeature1(event.target.value);
  };

  const handleChangeValue2 = (event) => {
    setValue2(event.target.value);
  };

  const handleChangeEffort2 = (event) => {
    setEffort2(event.target.value);
  };

  const handleChangeFeature2 = (event) => {
    setFeature2(event.target.value);
  };

  const feature1Data = data.datasets[0].data.filter((item) =>
    item.label.includes(`${effort1}_${value1}`)
  );

  const feature2Data = data.datasets[0].data.filter((item) =>
    item.label.includes(`${effort2}_${value2}`)
  );

  return (
    <div
      className="all"
      style={{
        display: "flex",
        justifycontent: "flex-end",
        margin: 10,
      }}
    >
      <div
        className="feature_list"
        style={{
          display: "inline-block",
          width: "10%",
        }}
      >
        <div className="feature1" style={{ marginRight: "20px" }}>
          <div style={{ marginTop: 10 }}>
            <label htmlFor="feature">Feature 1</label>
          </div>
          <div>
            <input
              type="text"
              id="text"
              value={feature1}
              onChange={handleChangeFeature1}
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <label htmlFor="value1">Value</label>
            <div>
              <select id="value" value={value1} onChange={handleChangeValue1}>
                <option value="low">Low</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <label htmlFor="effort">Effort</label>
            <div>
              <select
                id="effort"
                value={effort1}
                onChange={handleChangeEffort1}
              >
                <option value="sm">Small-Medium</option>
                <option value="large-xl">Large-XL</option>
              </select>
            </div>
          </div>
          <hr className="dashed" style={{ marginTop: 10 }}></hr>
        </div>
        <div className="feature2" style={{ marginRight: "20px" }}>
          <div style={{ marginTop: 10 }}>
            <label htmlFor="feature2">Feature 2</label>
          </div>
          <div>
            <input
              type="text"
              id="text"
              value={feature2}
              onChange={handleChangeFeature2}
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <label htmlFor="value">Value</label>
            <div>
              <select id="value" value={value2} onChange={handleChangeValue2}>
                <option value="low">Low</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <label htmlFor="effort">Effort</label>
            <div>
              <select
                id="effort"
                value={effort2}
                onChange={handleChangeEffort2}
              >
                <option value="sm">Small-Medium</option>
                <option value="large-xl">Large-XL</option>
              </select>
            </div>
          </div>
          <div>
            <hr className="dashed" style={{ marginTop: 10 }}></hr>
          </div>
        </div>
        <div className="info">
          <p style={{ fontSize: 10 }}>
            The methodology is a graph for prioritization matrix with axes for
            “Business Value” and “Complexity/Effort.” The chart is then broken
            down into quadrants as follows: high value, low complexity; high
            value, high complexity; low value, low complexity; and low value,
            high complexity. The team will then evaluate each initiative and
            plot it on the graph, providing a visual representation of every
            initiative’s anticipated value and required effort.
            <br></br>
            <a
              href="https://www.productplan.com/glossary/value-vs-complexity/"
              target="_blank"
              rel="noreferrer"
            >
              ProductPlan
            </a>
          </p>
        </div>
      </div>

      <div
        className="chart"
        style={{
          width: "90%",
          marginTop: 20,
          marginLeft: 50,
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "70%",
          backgroundRepeat: "no-repeat",
          opacity: 0.6,
        }}
      >
        <Scatter
          data={{
            datasets: [
              {
                label: feature1,
                data: feature1Data,
                pointRadius: 40,
                pointBackgroundColor: "#BF1717",
                pointBorderWidth: 2,
                pointBorderColor: "black",
                pointHoverRadius: 40,
              },
              {
                label: feature2,
                data: feature2Data,
                pointRadius: 40,
                pointBackgroundColor: "#FFEB18",
                pointBorderWidth: 2,
                pointBorderColor: "black",
                pointHoverRadius: 40,
              },
            ],
            borderColor: "#4cccff",
            borderWidth: 3,
            showLine: true, // show line in scatter plot
            fill: false, // only show line
          }}
          options={options}
        />
      </div>
      <div
        className="footer"
        style={{ position: "absolute", bottom: "3px", right: "1%" }}
      >
        <a
          style={{ fontSize: 14, color: "grey" }}
          href="https://www.linkedin.com/in/cagirtas/"
          target="_blank"
          rel="noreferrer"
        >
          cagirtas 🫶
        </a>
      </div>
    </div>
  );
};

export default App;
