import api from "./api";
import getUserID from "./getUserID";



export async function updateQuantitiesOnDB(newStock: Map<number, number>) {

    let strArrayQuantities = JSON.stringify(Array.from(newStock))

    // setIsLoading(true);//inicia feedback de carregamento e desativa o botão de editar estoque até a atualizção do mesmo seja feita no BD
    const ID_USER = await getUserID();

    // const url = `${process.env.REACT_APP_LINK_API}/${ID_USER}/stock/update`;
    await new Promise((resolve, reject) => {
        setTimeout(async () => {
            api.post(`/${ID_USER}/stock/update`, {
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
    })

}
