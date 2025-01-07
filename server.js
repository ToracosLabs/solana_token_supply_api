const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000; 

// Endpoint para obtener los datos de supply
app.get("/api/supply", async (req, res) => {
    try {
      // Mint address de tu token
      const mintAddress = "4AdDFsG1xzz1L7zKGo2fbiqv256Z92u8uCcJCgYuTBLo";
  
      // URL del API de Solana
      const apiUrl = `https://api.solana.fm/v1/tokens/${mintAddress}/supply`;
  
      // Llamada al endpoint de Solana
      const response = await axios.get(apiUrl);
  
      // Extraer los datos necesarios del JSON devuelto
      const { circulatingSupply, realCirculatingSupply, decimals } = response.data;
  
      // Convertir los valores si es necesario (decimales)
      // const circulating = circulatingSupply / Math.pow(10, decimals);
      // const total = realCirculatingSupply / Math.pow(10, decimals);
      const circulating = circulatingSupply
      const total = realCirculatingSupply
      // Crear la respuesta JSON
      const supplyData = {
        circulatingSupply: circulating,
        totalSupply: total, // Ahora tomado de realCirculatingSupply
        maxSupply: null, // No disponible en la API
      };
  
      // Enviar la respuesta
      res.json(supplyData);
    } catch (error) {
      console.error("Error fetching supply data:", error.message);
      res.status(500).json({ error: "Failed to fetch supply data" });
    }
  });
  

// Endpoint para obtener solo el circulatingSupply
app.get("/api/supply/circulating", async (req, res) => {
  try {
    const mintAddress = "4AdDFsG1xzz1L7zKGo2fbiqv256Z92u8uCcJCgYuTBLo";
    const apiUrl = `https://api.solana.fm/v1/tokens/${mintAddress}/supply`;

    const response = await axios.get(apiUrl);
    const { circulatingSupply, decimals } = response.data;
    // const circulating = circulatingSupply / Math.pow(10, decimals);
    const circulating = circulatingSupply;

    res.send(circulating.toString()); // Devolver solo el valor
  } catch (error) {
    console.error("Error fetching circulating supply:", error.message);
    res.status(500).send("Failed to fetch circulating supply");
  }
});

// Endpoint para obtener solo el totalSupply
app.get("/api/supply/total", async (req, res) => {
  try {
    const mintAddress = "4AdDFsG1xzz1L7zKGo2fbiqv256Z92u8uCcJCgYuTBLo";
    const apiUrl = `https://api.solana.fm/v1/tokens/${mintAddress}/supply`;

    const response = await axios.get(apiUrl);
    const { realCirculatingSupply, decimals } = response.data;
    // const total = realCirculatingSupply / Math.pow(10, decimals);
    const total = realCirculatingSupply;

    res.send(total.toString()); // Devolver solo el valor
  } catch (error) {
    console.error("Error fetching total supply:", error.message);
    res.status(500).send("Failed to fetch total supply");
  }
});

// Endpoint para obtener solo el maxSupply
app.get("/api/supply/max", async (req, res) => {
  try {
    res.send("null"); // No disponible, devolver como texto "null"
  } catch (error) {
    console.error("Error fetching max supply:", error.message);
    res.status(500).send("Failed to fetch max supply");
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



