/**
 * @jest-environment jsdom
 */

import { IMovie } from "../ts/models/Movie";
import { getData } from "../ts/services/movieservice";
import { mockData } from "../ts/services/__mocks__/movieservice";

jest.mock("axios", () => ({
  get: async (searchText: string) => {
    return new Promise((resolve, reject) => {
      let queryString: string = searchText;
      let url: URLSearchParams = new URLSearchParams(queryString);
      let s = url.get("s");
      let newSearchText: string = `${s}`;
      console.log(newSearchText);
      if (newSearchText.length > 0) {
        resolve({ data: { Search: mockData } });
      } else {
        reject({ data: [] });
      }
    });
  },
}));

describe("getData", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should get mock data", async () => {
    //arrange
    expect.assertions(5);
    let searchText: string = "Star Wars IV";

    //act
    let response: IMovie[] = await getData(searchText);
    //assert
    expect(response.length).toBe(3);
    expect(response.length).toBeGreaterThan(0);
    expect(response[0].Title).toBe("Star Wars IV");
    expect(response[1].Title).toBe("The Lord of the Rings");
    expect(response[0].Year).toBe("1977");
  });

  test("should reject and error", async () => {
    jest.mock("axios", () => ({
      get: async () => {
        return new Promise((resolve, reject) => {
          reject({
            data: "Ingenting finns här",
          });
        });
      },
    }));

    let searchText: string = "";
    let movies: IMovie[];
    try {
      movies = await getData(searchText);
    } catch (response: any) {
      expect(response.data).toBe("Ingenting finns här");
    }
  });
});
