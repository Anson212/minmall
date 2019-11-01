import  axios  from "./axios"


export function getCategory() {
  return axios({
    url: '/v1/category'
  })
}

export function getSubcategory(maitKey) {
  return axios({
    url: '/v1/subcategory',
    params: {
      maitKey
    }
  })
}

//export function getCategoryDetailPop(miniWallkey, type) {
//return request({
//  url: '/data/subcategory_detail_pop.json',
//  params: {
//    miniWallkey,
//    type
//  }
//})
//}
//export function getCategoryDetailNew(miniWallkey, type) {
//return request({
//  url: '/data/subcategory_detail_new.json',
//  params: {
//    miniWallkey,
//    type
//  }
//})
//}


//export function getCategoryDetail(miniWallkey, type) {
//return axios({
//  url: '/api/v1/subcategory/detail',
//  params: {
//    miniWallkey,
//    type
//  }
//})
//}
