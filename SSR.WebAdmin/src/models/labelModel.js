const toJson = (item) => {
    return {
        id : item.id,
        name : item.name ,
        //loaiDanhMuc:item.loaiDanhMuc,
        color:item.color,
        parentId: item.parentId,
        knowledge: item.knowledge,
    }
}
const fromJson = (item) => {
    return {
        id : item.id,
        name : item.name ,
        //loaiDanhMuc:item.loaiDanhMuc,
        color:item.color,
        parentId: item.parentId,
        knowledge: item.knowledge,
    }
}

const baseJson = () => {
    return {
        id : null,
        name : null ,
        color: null,
        parentId: null,
        knowledge: null,
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

export const labelModel = {
    toJson, fromJson, baseJson, toListModel
}
