//vue-boolflix - 12/04/2021
// Author: Lore
var app = new Vue({
	el: '#root',
	data: {
		searchTxt: '', //bind input txt ricerca
		searchResult: [], //array risultati film
		searchResultTv: [], //array risultati serietv
		currentPagina: 1, //pagina corrente film
		totPagine: 0,	//numero di pagine totali risultati film
		baseImgPath: '',	//path delle immagini
		currentMovieCast: [], //array cast
		tipo: 'film',	//per le schede film/serie tv
		currentGeneri: [],	// tutti i generi tv
		currentGeneriTv: [], //tutti i generi serie tv
		generiSearch: [], //generi del risultato di ricerca film
		generiSearchTv: [], //generi del risultato di ricerca serie tv
		breadCrumb: [], //array generi linkati tra id e nomi per visualizzare in pagina da selezionare film
		selectedGenere: '', //genere selezionato in breadcrumb film
		selectedGenereTv: '', //genere selezionato in breadcrumb serie tv
		breadCrumbTv: [], //array generi linkati tra id e nomi per visualizzare in pagina da selezionare serie tv
		totPagineTv: 0, //totale pagine dei risultati serie tv
		currentPaginaTv: 1, //pagina corrente serie tv
		totalResults: 0, //risultati totali film
		totalResultsTv: 0, //risultati totali serie tv
		currentFlag: '' // bandiera corrente
	},
	mounted () {
		//prendo i path delle immagini dal api config
		axios.get('https://api.themoviedb.org/3/configuration?api_key=db6e548b4cda3f3d5550a22268a7e90c')
			.then((configs) => {
				//seleziono la larghezza delle immagini
				let size = configs.data.images.poster_sizes[3];
				// prendo uri di base
				let base = configs.data.images.base_url;
				//assemblo per ottenere il path completo
				this.baseImgPath = base+size;

			})
		//mi salvo tutti i generi dei film
		axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=db6e548b4cda3f3d5550a22268a7e90c')
			.then((risposta) => {
				this.currentGeneri = risposta.data.genres

			})
		//mi salvo tutti i generi serie tv
		axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=db6e548b4cda3f3d5550a22268a7e90c')
			.then((risposta) => {
				this.currentGeneriTv = risposta.data.genres

			})
	},
	computed: {},
	methods: {
		//ricerca per campo input
		searchMovies: function (searchTxt) {
			//in base al testo inserito e alla pagina corrente (parte da 1 come da data:)
			axios.get('https://api.themoviedb.org/3/search/movie?api_key=db6e548b4cda3f3d5550a22268a7e90c&query='+ searchTxt + '&page=' + this.currentPagina)
				.then((risposta) => {
					//salvo in array i risultati
					this.searchResult = risposta.data.results;
					// salvo il numero di pagine totali
					this.totPagine = risposta.data.total_pages;
					// salvo il numero di risultati totali
					this.totalResults = risposta.data.total_results;
					//azzero array generi della ricerca corrente prima di ogni nuova query
					this.generiSearch = [];
					//stessa cosa per i link dei generi del breadcrumb
					this.breadCrumb = [];
					//mi salvo in array tutti i generi della ricerca
					risposta.data.results.forEach((item)=>{
						item.genre_ids.forEach((elemento)=>{
							if (!this.generiSearch.includes(elemento)){

								this.generiSearch.push(elemento);
							}

						})

					})
					//associo id e name e li pusho in nuovo array (perchè sono in due array diversi)
					this.currentGeneri.forEach((item)=>{
						this.generiSearch.forEach((elemento)=>{
							if (item.id === elemento) {
								let tempObj = {
									id: item.id,
									name: item.name
								}
								this.breadCrumb.push(tempObj)

							}

						})

					})
				})
			// ricerca serie tv (stessa cosa delle righe sopra 61-99
			axios.get('https://api.themoviedb.org/3/search/tv?api_key=db6e548b4cda3f3d5550a22268a7e90c&query='+ searchTxt+ '&page=' + this.currentPaginaTv)
				.then((risposta) => {
					this.searchResultTv = risposta.data.results;
					this.totPagineTv = risposta.data.total_pages;
					this.totalResultsTv = risposta.data.total_results;
					this.generiSearchTv = [];
					this.breadCrumbTv = [];
					//mi salvo in array tutti i generi della ricerca
					risposta.data.results.forEach((item)=>{
						item.genre_ids.forEach((elemento)=>{
							if (!this.generiSearchTv.includes(elemento)){
								this.generiSearchTv.push(elemento);
							}

						})

					})
					this.currentGeneriTv.forEach((item)=>{
						this.generiSearchTv.forEach((elemento)=>{
							if (item.id === elemento) {
								let tempObj = {
									id: item.id,
									name: item.name
								}
								this.breadCrumbTv.push(tempObj)
							}

						})
					})
				})
		},
		//conversione bandiere per adattarlo alla sorgente delle immagini delle bandiere
		apiFlags: function (sigla_in)  {
			//prendo i dati dalla mia api dove sono associate sigla lingua con bandiera giusta
			//riceve in ingresso la lingua da movie db e restituisce la sigla della bandiera da usare
			//nel sito countryflags.io
			axios.get(`https://www.bearwebdesign.it/api/flag/index.php?query=${sigla_in}`)
				.then((risposta)=>{
					this.currentFlag = risposta.data.flag[0].sigla_out
				})

		},
		//calcolo delle stelle in base al rating
		calcStar: function (rating) {
			//mi assicuro che il rating venga considerato come un float
			let base10 = parseFloat(rating);
			// lo divido per due e lo arrotondo
			let base5 = Math.round(base10 / 2);
			return base5
		},
		//richiesta api del cast in base all'id del film che gli passo
		//e salvo in array
		getCast: function (movieId) {
			axios.get('https://api.themoviedb.org/3/movie/'+ movieId + '/credits?api_key=db6e548b4cda3f3d5550a22268a7e90c')
				.then((risposta) => {
					this.currentMovieCast = risposta.data.cast;
			})
		},
		//richiesta api del cast in base all'id della serie tv che gli passo
		//e salvo in array
		getCastTv: function (movieId) {
			axios.get('https://api.themoviedb.org/3/tv/'+ movieId + '/credits?api_key=db6e548b4cda3f3d5550a22268a7e90c')
				.then((risposta) => {
					this.currentMovieCast = risposta.data.cast;
				})
		},
		//svuotamento array cast
		purgeCast: function () {
			this.currentMovieCast = []
		},
		//salvataggio id del genere che l'utente clicca nel breadcrumb serve per l'incrocio
		//vedi metodo searchMovies alla fine
		getSelGenere: function (genid) {
			this.selectedGenere = genid
			this.selectedGenereTv = genid




		}
	}
});

