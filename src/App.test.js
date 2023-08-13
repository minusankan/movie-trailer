import React from "react";
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import fetchMock from "jest-fetch-mock";

// Mock the global fetch
global.fetch = fetchMock;

beforeEach(() => {
  fetch.resetMocks();
});

const mockData = {
  languageList: ["English", "Hindi"],
  moviesData: {
    ET00093903: {
      EventGroup: "EG00071990",
      EventTitle: "Notebook",
      EventCode: "ET00093903",
      EventImageCode: "notebook-2019-et00093903-10-01-2019-03-50-36",
      EventImageUrl:
        "https://in.bmscdn.com/iedb/movies/images/mobile/thumbnail/medium/notebook-2019-et00093903-10-01-2019-03-50-36.jpg",
      EventLanguage: "Hindi",
      EventGenre: "Drama|Romance",
      EventURL: "notebook",
      EventName: "Notebook",
      ShowDate: "29 Mar, 2019",
      DispReleaseDate: "MARCH 29, 2019",
      MonthID: "201903",
      TrailerURL: "https://www.youtube.com/watch?v=SXYxOCLc9-c",
      AllowPreBook: "N",
      IsAtmosEnabled: "N",
      TentativeReleaseDate: "0",
      EventIsDefault: "Y",
      EventCensor: "U",
      EventDimension: "2D",
      TrailerURLUploadDate: "2019-02-22 19:34:18",
      LanguageSequence: "1",
      IsMovieClubEnabled: "N",
      IsPremiere: "N",
      ratings: {
        bmsRating: 0,
        bmsCount: 0,
        criticRating: 0,
        criticCount: 0,
        userRating: 0,
        userCount: 0,
        userReviewCount: 0,
        avgRating: 0,
        totalVotes: 0,
        wtsCount: 8902,
        dwtsCount: 15,
        maybe: 0,
        totalWTSCount: 8917,
        wtsPerc: 100,
        dwtsPerc: 0,
      },
      Region: [
        "AHD",
        "AHMED",
        "AND",
        "ALI",
        "ALLH",
        "AMRI",
        "AJMER",
        "AURA",
        "BANG",
        "BARA",
        "BEHA",
        "BELG",
        "BHAR",
        "BHNG",
        "BHIL",
        "BHOP",
        "BHUB",
        "BHILAI",
        "BOIS",
        "CHAN",
        "BURD",
        "CHD",
        "BHWD",
        "BILA",
        "BOKA",
        "BHWN",
        "BLRY",
        "CHEN",
        "COIM",
        "DEES",
        "CUTT",
        "DEH",
        "DHAN",
        "DAVA",
        "GDHAM",
        "GNAGAR",
        "DURGA",
        "DURG",
        "GUW",
        "GOA",
        "GULB",
        "HYD",
        "HLDI",
        "HWRH",
        "HALD",
        "HISR",
        "HUBL",
        "JAIP",
        "IND",
        "JALG",
        "JAM",
        "JODH",
        "JRSG",
        "JAMM",
        "KALG",
        "KANP",
        "KANK",
        "KHOP",
        "KOLH",
        "KGPR",
        "KOLK",
        "KOSA",
        "KOTA",
        "KRBA",
        "KURU",
        "LKPK",
        "LUCK",
        "LUDH",
        "MUMBAI",
        "MUDA",
        "MERT",
        "MANI",
        "NADI",
        "MUZA",
        "MYS",
        "NAGP",
        "NAND",
        "NASK",
        "NCR",
        "NVSR",
        "PALN",
        "PATA",
        "NMCH",
        "PATN",
        "PUNE",
        "RAJK",
        "RAIG",
        "RANC",
        "SANG",
        "ROH",
        "SOLA",
        "SILI",
        "SIKR",
        "SHLG",
        "SHIA",
        "SURT",
        "TRIV",
        "VAD",
        "UDAI",
        "VELL",
        "VIJA",
        "VAPI",
        "VIZA",
        "VLSD",
        "YAMU",
      ],
      wtsCount: 9010,
      dwtsCount: 16,
      maybeCount: 0,
      csCount: "9,026",
      trailerUploadDate: 1550844258000,
      totalVotes: 0,
      avgRating: 0,
      wtsPerc: 100,
      trailerType: "cs",
    }
  },
};

describe("<App />", () => {
 
  it("fetches and displays movies", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockData));

    render(<App />);

    await waitFor(() =>
      expect(screen.getByText("Notebook")).toBeInTheDocument()
    );
  });

  it("filters movies based on search term", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockData));

    render(<App />);
    await waitFor(() =>
      expect(screen.getByText("Notebook")).toBeInTheDocument()
    );

    fireEvent.change(screen.getByPlaceholderText("Search by title..."), {
      target: { value: "Notebook" },
    });

    await waitFor(() =>
      expect(screen.getByText("Notebook")).toBeInTheDocument()
    );
  });

});
