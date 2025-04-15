import { createAsyncThunk } from "@reduxjs/toolkit";
import API_ENDPOINTS from "../../constants/apiConstans";


const res = {
  "resp": "Emaar Properties Overview\n\n1. **Company Name and Industry**: Emaar Properties is a leading real estate development company, recognized globally for its contributions to the real estate, retail, hospitality, and leisure industries.\n\n2. **Headquarters and Global Presence**: Headquartered in Dubai, United Arab Emirates, Emaar operates in several international markets, including Turkey, Egypt, Lebanon, India, and Pakistan, among others.\n\n3. **Products and Services**: Emaar is renowned for its real estate developments, including residential, commercial, and hospitality projects. The company also manages shopping malls, hotels, and leisure attractions, such as the iconic Burj Khalifa and Dubai Mall.\n\n4. **Founding Year**: Emaar Properties was founded in 1997 and has since grown to become one of the most valuable real estate companies worldwide.\n\n5. **Company Size and Financials**: As of December 2023, Emaar's net asset value is AED 177.5 billion (USD 48.3 billion). The company is a Public Joint Stock Company listed on the Dubai Financial Market.\n\n6. **Subsidiaries and Business Units**: Emaar operates several subsidiaries, including Emaar Development, Emaar Mills, and Emaar Hospitality, each contributing to its diverse portfolio of real estate and lifestyle offerings.\n\n7. **Commitment to Excellence**: Emaar is committed to design excellence, build quality, and timely delivery, shaping new lifestyles and communities through its innovative and sustainable developments."
}

const response={

  "status": "success",

  "summary": "**Company Name:** Emaar Properties\n\n**Industry:** Real Estate and Lifestyle Development\n\n**Headquarters and Locations:** Emaar Properties is headquartered in Dubai, United Arab Emirates. The company has a significant presence in Dubai with developments such as Dubai Hills Estate, Dubai Creek Harbour, Emaar South, The Valley, Emaar Beachfront, and Downtown Dubai. Internationally, Emaar has expanded its footprint with projects in various countries.\n\n**Products/Services:** Emaar Properties is renowned for its real estate developments, which include residential, commercial, and hospitality properties. The company is behind iconic projects such as the Burj Khalifa, Dubai Mall, and various luxury hotels and resorts under the Address Hotels + Resorts brand. Emaar also operates Emaar Malls, Emaar Entertainment, and Emaar Hospitality, offering a wide range of services from shopping and entertainment to hotel and leisure experiences.\n\n**Founding Year:** 1997\n\n**Company Size:** Emaar Properties is a large public joint-stock company listed on the Dubai Financial Market. It employs thousands of people across its various divisions and subsidiaries. The company has a diverse portfolio with numerous subsidiaries, including Emaar Development, Emaar Malls, and Emaar Hospitality. Emaar's revenue and employee numbers reflect its status as a leading global developer, although specific figures can vary annually based on market conditions and project completions.",

  "application_id": "fd046b2a-9526-4e1a-9535-ba25a012905a"

}



export const getWebScrapping = async (
  applicationId: string,
  URL: string,
  signal?: AbortSignal
) => {
  const response = await fetch(
    `${API_ENDPOINTS.POST_WEBSCRAPING}?application_id=${applicationId}&url=${encodeURIComponent(URL)}`,
    {
      method: 'POST',
      signal,
    }
  );

  if (!response.ok) {
    throw new Error('Webscraping API failed');
  }

  return response.json();
};

// Thunk to fetch web scraping data
export const fetchWebScrapingData = createAsyncThunk(
  "webScraping/fetchWebScrapingData",
  async ({ applicationID, URL }: { applicationID: string; URL: string }, thunkAPI) => {
    try {
      const response = await getWebScrapping(applicationID,URL);
      console.log(response)
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch web scraping data");
    }
    //return response;
  }
);