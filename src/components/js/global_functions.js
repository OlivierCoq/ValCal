export const pgnt_data = (perPage) => {
  return {
	      page: 1,
  			perPage: perPage,
  			pages: [],
  			maxNum: false,
	    }
}

export const setPages = (vue_object, dataset) => {
	    console.log("setting pages", vue_object.pgnt.perPage)
			let numOfPages = Math.ceil(dataset.length/vue_object.pgnt.perPage)
			for (let index = 1; index <= numOfPages; index++) {
				vue_object.pgnt.pages.push(index);
			}
		}
export const getPageNum = (vue_object, dataset) => {
			let numOfPages = Math.ceil(dataset.length/vue_object.pgnt.perPage)
			// console.log("numOfPages:", numOfPages)
			// console.log(Array(numOfPages));
			vue_object.pgnt.maxNum = numOfPages
		}
export const paginate = (vue_object, dataset) => {
			let from = (vue_object.pgnt.page * vue_object.pgnt.perPage) - vue_object.pgnt.perPage
			let to = (vue_object.pgnt.page * vue_object.pgnt.perPage)
			return dataset.slice(from, to)
		}
export const pageStatus = (vue_object) => {
			return vue_object.pgnt.page > 1 ? vue_object.$refs.previous_btn.removeAttribute("disabled") : vue_object.$refs.previous_btn.setAttribute("disabled", "disabled")
		}
export const previous = (vue_object) => {
			vue_object.pgnt.page--
			vue_object.pageStatus()
		}
export const next = (vue_object) => {
			vue_object.pgnt.page++
			vue_object.pageStatus()
		}
