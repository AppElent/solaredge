import fetch from 'node-fetch';

type Period = 'DAY' | 'QUARTER_OF_AN_HOUR' | 'MONTH' | 'HOUR' | 'WEEK' | 'MONTH' | 'YEAR';

export default class SolarEdge {
  public HOST = 'https://monitoringapi.solaredge.com';

  constructor(private API_KEY: string) {
    this.API_KEY = API_KEY;
  }

  public fetchSolarEdge = async (url: string, options?) => {
    if (!url.toLowerCase().startsWith('http')) {
      url = this.HOST + url;
    }
    const response = await fetch(url, options);
    if (response.status !== 200) {
      throw new Error(
        'Error fetching SolarEdge data from URL ' + url + ': ' + response.status + ' - ' + response.statusText,
      );
    }
    const data = await response.json();
    return data;
  };

  public getData = async (site: number, start: string, end: string, period: Period) =>
    this.fetchSolarEdge(
      this.HOST +
        '/site/' +
        site +
        '/energy?timeUnit=' +
        period.toUpperCase() +
        '&endDate=' +
        end +
        '&startDate=' +
        start +
        '&api_key=' +
        this.API_KEY,
    );

  public getSiteData = async () => this.fetchSolarEdge(this.HOST + '/sites/list?size=1&api_key=' + this.API_KEY);

  public getEquipmentData = async (site: number) =>
    this.fetchSolarEdge(this.HOST + '/equipment/' + site + '/list?size=1&api_key=' + this.API_KEY);
}
