const toJson = (item) => {
    return {
        id : item.id,
        name: item.name,
        content : item.content ,
        //loaiDanhMuc:item.loaiDanhMuc,
    }
}
const fromJson = (item) => {
    return {
        id : item.id,
        name: item.name,
        content : item.content ,
        //loaiDanhMuc:item.loaiDanhMuc,
    }
}

const baseJson = () => {
    return {
        id : null,
        name: null,
        content : null ,
        //loaiDanhMuc:null,
    }
}

const toListModel = (items) =>{
    if(items.length > 0){
        let data = [];
        items.map((value, index) =>{
            data.push(fromJson(value));
        })
        return data??[];
    }
    return [];
}

export const knowledgeModel = {
    toJson, fromJson, baseJson, toListModel
}
