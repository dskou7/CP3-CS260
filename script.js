//api key for the bungo
//pls no steal
//"X-API-KEY", "69d2f2e52ced40e5b0e4243a02de5535"

//decent overview of promises
// https://davidwalsh.name/promises


var app = new Vue({
  el: '#app',
  data: {
    searchText: '',
    platformID: '',
    platformIcon: '',
    playerID: '',
    playerName: '',
    characterIds: [],
    characters: [],
  },
  computed: {

  },
  methods: {
    async playerSearch() {
      try {
        console.log("playerSearch called");
        // /SearchDestinyPlayer/1/" + value + "/"
        const response = await axInstance.get('/SearchDestinyPlayer/-1/' + this.searchText + "/");
        console.log(response.data.Response[0]);
        this.platformID = response.data.Response[0].membershipType
        this.playerID = response.data.Response[0].membershipId
        this.playerName = response.data.Response[0].displayName
        this.platformIcon = "https://www.bungie.net" + response.data.Response[0].iconPath
      } catch (error) {
        console.log(error);
      }
    },
    async searchName() {
      this.characterIds = [];
      this.characters = [];
      this.playerID = "";
      this.platformIcon = "";
      this.playerID = "";
      this.playerName = "Searching...";
      if(this.searchText != ''){
        //console.log("searching for " + this.searchText);
        //this.playerSearch().then(this.profileSearch());
        await this.playerSearch();
        await this.profileSearch();
        for (var ID in this.characterIds){
          await this.characterSearch(this.characterIds[ID]);
        }

        this.searchText = '';
      }
    },
    async profileSearch() {
      try {
        console.log("profileSearch called, searching for " + this.playerID + " on platform " + this.platformID);
        const response = await axInstance.get("/" + this.platformID + "/Profile/" + this.playerID + "/?components=100");
        //console.log("vvv profile search data vvv")
        //console.log(response.data);
        this.characterIds = response.data.Response.profile.data.characterIds;
      } catch (error) {
        console.log(error);
      }
    },
    async characterSearch(charID) {
      //  platformID + "/Profile/" + playerID + "/Character/" + char1 + "/?components=200"
      const response = await axInstance.get("/" + this.platformID + "/Profile/" + this.playerID + "/Character/" + charID + "/?components=200");
      //console.log("vvv character search data for ID " + charID + " vvv")
      //console.log(response.data);
      var charClass = "";
      var charRace = "";
      var charGender = "";
      // class
      switch (response.data.Response.character.data.classHash) {
        case 3655393761:
          charClass = "Titan";
          break;
        case 2271682572:
          charClass = "Warlock";
          break;
        case 671679327:
          charClass = "Hunter";
          break;
        default:
          charClass = "Unknown Class";
      }
      // race
      switch (response.data.Response.character.data.raceHash) {
        case 898834093:
          charRace = "Exo";
          break;
        case 2803282938:
          charRace = "Awoken";
          break;
        case 3887404748:
          charRace = "Human";
          break;
        default:
          charClass = "Unknown Race";
      }
      switch (response.data.Response.character.data.genderHash) {
        case 3111576190:
          charGender = "Male";
          break;
        case 2204441813:
          charGender = "Female";
          break;
        default:
          charGender = "Mayonnaise";
      }
      var character = {
        baseLevel: response.data.Response.character.data.baseCharacterLevel,
        d2class: charClass,
        gender: charGender,
        race: charRace,
        emblemBackgroundPath: "'https://www.bungie.net" + response.data.Response.character.data.emblemBackgroundPath + "'",
        lightLevel: response.data.Response.character.data.light,
        minutesPlayed: response.data.Response.character.data.minutesPlayedTotal,
      };
      this.characters.push(character);
    },
  },
});


const axInstance = axios.create({
  method: 'get',
  baseURL: 'https://www.bungie.net/Platform/Destiny2',
  timeout: 2000,
  headers: {'X-API-KEY': '69d2f2e52ced40e5b0e4243a02de5535'},
});


//hash crap
//class
//3655393761 = titan
//2271682572 = warlock
// 671679327 = hunter


//gender
// 3111576190 = male
// 2204441813 = female

//race
// 898834093 = exo
// 2803282938 = awoken
// 3887404748 = human
