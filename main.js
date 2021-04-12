//vue-boolflix - 12/04/2021
// Author: Lore
/*$(document).ready(function () {

});*/
var app = new Vue({
	el: '#root',
	data: {
		searchTxt: 'back to the future',
		searchResult: [],
		pagina: '',
		totPagine: '',
		baseImgPath: ''
	},
	mounted () {
		axios.get('https://api.themoviedb.org/3/configuration?api_key=db6e548b4cda3f3d5550a22268a7e90c')
			.then((configs) => {
				let size = configs.data.images.logo_sizes[3];
				let base = configs.data.images.base_url;
				this.baseImgPath = base+size;

			})
	},
	computed: {},
	methods: {
		searchMovies: function (searchTxt) {
			axios.get('https://api.themoviedb.org/3/search/movie?api_key=db6e548b4cda3f3d5550a22268a7e90c&query='+ searchTxt)
				.then((risposta) => {
					this.searchResult = risposta.data.results;
					console.log(risposta.data);
					this.pagina = risposta.data.page;
					this.totPagine = risposta.data.total_pages;
				})
		},
		getFlag: function (lingua) {
			switch (lingua) {
				case "it":
					return './img/it.png';
				case "en":
					return './img/en.png';
			}

		}
	}
});