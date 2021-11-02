import DropdownLogic from "./DropdownLogic";
import store from "../../../store/store";
import { act } from "react-dom/test-utils";

const COUNTRIES_LIST = ['Russia', 'Brasil', 'Canada', 'Estonia', 'Norway', 'Japan'];

describe('dropdown test', () => {
  test('initial state', () => {
    const { opened, value } = DropdownLogic(store);

    expect(opened).toBeFalsy();
    expect(value).toEqual('Please, select the country');
  })

  test('select country filter', async () => {

    store.countriesList = COUNTRIES_LIST;
    const { selectCountry } = DropdownLogic(store);

    let filter = store.countryFilter;
    expect(filter).toEqual('All');

    await act(async () => {
      await selectCountry('Canada');
      filter = store.countryFilter;
    });

    expect(filter).toEqual('Canada');
  })
})