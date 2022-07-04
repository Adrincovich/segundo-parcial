const logoutUser = document.getElementById('logout');
logoutUser.addEventListener("click", function(){
    localStorage.clear();
    window.location.assign("/index.html");
});

const tabla = (function (respuestaJson){
    const tableContainer = document.getElementById('tableContainer');
    for(let i of respuestaJson['data']){
        tableContainer.innerHTML +=`
        <tr class='table-tr'>
            <td class='table-td'>${i.id}</td>
            <td class='table-td'>${i.name}</td>
            <td class='table-td'>${i.username}</td>
            <td class='table-td'>${i.email}</td>
            <td class='table-td'>${i.address.street}</td>
            <td class='table-td'>${i.address.suite}</td>
            <td class='table-td'>${i.address.city}</td>
            <td class='table-td'>${i.phone}</td>
            <td class='table-td'>${i.company.name}</td>
        </tr>`
    }
});
fetch('https://basic-server-one.vercel.app/users')
.then(function(respuesta){
    return respuesta.json();
})
.then(function(respuestaJson){
    tabla(respuestaJson);;
});


