// import { techs } from "../data/dataSet.js"
import {Tech} from "../model/model.js"

const introToAPI = async (req, res) => {
    res.status(200).json({
        message: "Welcome to our languages API !",
        to_do: [
            {
                title: "You can get all the languages that are present in our dataset",
                method: "GET",
                url: "http://localhost:5011/api/techs/all-languages",
                expectedResult: "[objects]/null"
            },
            {
                title: "You can a random language that is present in our data set",
                method: "GET",
                url: "http://localhost:5011/api/techs/get-random-language",
                expectedResult: "[objects]/null"
            },
            {
                title: "You can filter languages based on Scope, Difficulty, Duration",
                method: "GET",
                url: "http://localhost:5011/api/techs?scope=***&difficulty=***&duration=***",
                expectedResult: "object/[objects]/null",
                expectedFilter: [
                    {
                        scope: [
                            "Web Development", "Frontend", "Backend", "Full Stack", "Data Science", "AI", "Automation", "Android Development", "Enterprise Apps", "Embedded Systems", "OS Development", "Low-level Programming", "Game Development", "Competitive Programming", "System Software", "Desktop Apps", "Web Apps (.NET)", "CMS", "Cloud Services", "System Programming", "iOS Development", "Mobile Apps", "WebAssembly", "Blockchain", "Cross-Platform Apps", "Statistics", "Machine Learning", "Big Data", "Functional Programming", "Scripting", "Linux Admin", "DevOps", "Databases", "Data Analysis", "Web Design", "UI/UX", "SSR Apps", "APIs", "Database", "Cloud", "CI/CD", "Containers", "Infrastructure", "Deep Learning", "Computer Vision", "Robotics", "Data Visualization", "Analysis", "3D Modeling", "Game Design", "Animation", "Version Control", "Collaboration", "Automation", "Configuration Management", "Cloud Infrastructure", "System Administration", "Security", "Windows Admin", "Web3", "Finance", "Smart Contracts", "Blockchain Development", "Frontend Integration", "3D Web", "Graphics", "Animation", "Frontend ML", "Cross-Platform", "Build Tools", "Bundling", "Optimization", "Code Quality", "Code Formatting", "Testing", "Assertions", "Frontend Testing", "Automation", "Data Engineering", "Analytics", "BI", "Search Engines", "Data Indexing", "Caching", "Message Queues", "Microservices", "Web Servers", "Load Balancing", "Hosting", "Cybersecurity", "Penetration Testing", "Networking", "Security Analysis", "LLM Apps", "Chatbots"
                        ]
                    },
                    { difficulty: ["Easy", "Medium", "Hard"] },
                    { duration: [1, 2, 3, 4], isIn: "months" },
                ]
            },
            {
                title: "You can search for a language using their ID (id).",
                method: "GET",
                url: "http://localhost:5011/api/techs/:id/info",
                expectedResult: "object/null"
            },
        ]
    })
}

// 
const getAllLanguages = (req, res) => {
  try {
    res.status(200).json({
      message: `Got all ${techs.length} languages for you!`,
      count: techs.length,
      techs,
    });
  } catch (err) {
    console.error("Error fetching all languages:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};


const getRandomLanguage = (req, res) => {
  try {
    const randomNumber = Math.floor(Math.random() * techs.length);
    const tech = techs[randomNumber];

    if (!tech) throw new Error("Failed to fetch random language");

    res.status(200).json({
      message: "Got a random language for you!",
      tech,
    });
  } catch (err) {
    console.error("Error fetching random language:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};


const getFilteredData = (req, res) => {
  try {
    let { scope, difficulty, duration } = req.query;

    if (!scope && !difficulty && !duration)
      throw new Error("Invalid filters. Please add 'scope', 'difficulty', or 'duration' as filters.");

    let filteredData = [...techs];
    let filterString = [];

    // 🔹 Difficulty filter
    if (difficulty) {
      filterString.push("difficulty");
      filteredData = filteredData.filter((data) =>
        data.difficulty.toLowerCase() === difficulty.toLowerCase().trim()
      );
    }

    // 🔹 Duration filter
    if (duration) {
      filterString.push("duration");
      filteredData = filteredData.filter((data) => {
        const months = Number(data.duration.split(" ")[0]);
        return months <= Number(duration.trim());
      });
    }

    // 🔹 Scope filter (supports multiple)
    if (scope) {
      filterString.push("scope");
      const scopeArray = scope.split(",").map((s) => s.toLowerCase().trim());
      filteredData = filteredData.filter((data) => {
        const dataScopes = data.scope.map((item) => item.toLowerCase().trim());
        return scopeArray.every((reqScope) => dataScopes.includes(reqScope));
      });
    }

    if (filteredData.length === 0)
      throw new Error(`No data found for filters: ${filterString.join(", ")}`);

    res.status(200).json({
      message: "Filtered data fetched successfully!",
      filtersUsed: filterString,
      results: filteredData.length,
      filteredData,
    });

  } catch (err) {
    console.error("Error while filtering:", err.message);
    res.status(500).json({
      message: "Unable to fetch filtered data",
      error: err.message,
    });
  }
};

const NewLanguage = (req, res) => {
    try {

        let { name, duration, difficulty, scope } = req.body

        if (!name || !duration || !difficulty || !scope) throw ("missing data to create a new language !")


        techs.push({ id: techs.length + 1, name, duration, difficulty, scope })

        res.status(202).json({ message: `new language ${name} has been addedd successfully !` })

    } catch (err) {
        res.status(400).json({ message: "unable to add new language !" })
    }
}

export { introToAPI, getAllLanguages, getRandomLanguage, getFilteredData , NewLanguage }