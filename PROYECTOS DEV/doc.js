
let cola = [];
let ordenesDelDia = 0;

document.getElementById("miFormulario").addEventListener("submit", (event)=>{
    
    let orden = document.querySelector(".form-control").value;
    event.preventDefault()


    if(orden == ""){

        const alerta = document.createElement('div');
        let container = document.getElementById("alertContainer");

        alerta.className = 'alert alert-info alert-dismissible fade show';
        alerta.role = 'alert';

        alerta.innerHTML = `
            <strong>¡Hola!</strong> No olvides especificar tu órden.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        `;

        container.appendChild(alerta);

        return;
    }else{
        
        ordenesDelDia++;

        //Math.floor(Math.random() * (max - min + 1)) + min
        let tiempo = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

        let pedido = {
            noOrden : ordenesDelDia,
            descripcion : orden,
            tiempo : tiempo
        }

        cola.push(pedido);

        renderizarEnProceso(pedido);
    }
})

async function renderizarEnProceso(pedido){

    let enProcesoContainer = document.querySelector(".enProcesoContainer");
    let ordenItem = "";

    for(item of cola){
        
        ordenItem = document.createElement('div');
        ordenItem.className = 'bg';

        ordenItem.innerHTML = `
            <p><span>No. Orden </span>${item.noOrden}</p>
            <span>Pedido</span>
            <p> ${item.descripcion}</p>
            <p><span>Tiempo </span>${item.tiempo}</p>
        `;
    }
    
    enProcesoContainer.appendChild(ordenItem);

    //setTimeout(renderizarTerminados(pedido), tiempo*1000);

    let algo = await procesandoPedido(pedido);
    renderizarTerminados(pedido);
    soloRenderizarEnProceso(pedido)
}

function soloRenderizarEnProceso(){
    
    let enProcesoContainer = document.querySelector(".enProcesoContainer");
    enProcesoContainer.innerHTML = "";

    let ordenItem = "";

    for(item of cola){

        ordenItem += `
            <div class="bg">
                <p><span>No. Orden </span>${item.noOrden}</p>
                <span>Pedido</span>
                <p> ${item.descripcion}</p>
                <p><span>Tiempo </span>${item.tiempo}</p>
            </div>
        `;
    }

    enProcesoContainer.innerHTML = ordenItem;

}

function procesandoPedido(pedido){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(cola = cola.filter(p => p.noOrden !== pedido.noOrden));
        }, pedido.tiempo*1000);
    })
}

function renderizarTerminados(pedido){

    console.log(cola)
    
    let terminadosContainer = document.querySelector(".terminadosContainer");
    let ordenItem = "";

    ordenItem = document.createElement('div');
    ordenItem.className = 'bg';

    ordenItem.innerHTML = `
        <p><span>No. Orden </span>${pedido.noOrden}</p>
        <span>Pedido</span>
        <p> ${pedido.descripcion}</p>
        <p><span>Tiempo </span>${pedido.tiempo}</p>
    `;

    terminadosContainer.appendChild(ordenItem);
}

