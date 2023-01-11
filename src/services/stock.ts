import axios from "axios"



export async function updateQuantitiesOnDB(newStock: Map<number, number>) {
    let strArrayQuantities = JSON.stringify(Array.from(newStock))

    // setIsLoading(true);//inicia feedback de carregamento e desativa o botão de editar estoque até a atualizção do mesmo seja feita no BD
    const ID_USER = 114;
    // const url = `${process.env.REACT_APP_LINK_API}/${ID_USER}/stock/update`;
    const url = `http://10.0.2.2:3001/${ID_USER}/stock/update`;
    await new Promise((resolve, reject) => {
        setTimeout(async () => {
            axios.post(url, {
                newQuantities: strArrayQuantities,//array em forma de string, passando as novas quantidades do estoque
            }).then(res => {
                if (res.data.success) {
                    resolve("Estoque atualizado com sucesso!");
                }
                else {
                    reject('Ocorreu algum erro!')
                }
            }).catch(err => reject(err.message))
        }, 2000)

        /*
        if (response.data.success) {
            return response.data;
        }
        else {
            throw 'Houve algum erro!'
        }
        resolve(() => {
 
        })*/
    })

}
