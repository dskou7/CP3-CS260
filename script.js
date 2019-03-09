//api key for the bungo
//pls no steal
//"X-API-KEY", "69d2f2e52ced40e5b0e4243a02de5535"

var app = new Vue({
  el: '#app',
  data: {
    searchText: '',
    platformID: '',
    playerID: '',
    playername: '',
  },
  computed: {

  },
  methods: {
    async playerSearch() {
      try {
        // /SearchDestinyPlayer/1/" + value + "/"
        const response = await axInstance.get('/SearchDestinyPlayer/-1/' + this.searchText + "/");
        console.log(response.data.Response[0]);
        this.platformID = response.data.Response[0].membershipType
        this.playerID = response.data.Response[0].membershipId
      } catch (error) {
        console.log(error);
      }
    },
    searchName() {
      if(this.searchText != ''){
        console.log("searching for " + this.searchText);
        this.playerSearch();
        this.searchText = '';
      }
    },
    async profileSearch() {
      const response = await axInstance.get('')
    },
  },
});


const axInstance = axios.create({
  method: 'get',
  baseURL: 'https://www.bungie.net/Platform/Destiny2',
  timeout: 2000,
  headers: {'X-API-KEY': '69d2f2e52ced40e5b0e4243a02de5535'},
});
