const toJson = (item) => {
    return {
        id : item.id,
        content : item.content ,
        //loaiDanhMuc:item.loaiDanhMuc,
        color:item.color
    }
}
const fromJson = (item) => {
    return {
        id : item.id,
        content : item.content ,
        //loaiDanhMuc:item.loaiDanhMuc,
        color:item.color
    }
}

const baseJson = () => {
    return {
        id : null,
        content : null ,
        //loaiDanhMuc:null,
        color: null
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
