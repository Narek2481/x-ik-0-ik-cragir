let current_player = "X";
let restart_btn = document.getElementById("restart_btn");
let start = document.getElementById("start");

start.addEventListener('click', start_game);
restart_btn.addEventListener("click", restart_game);

function start_game()
{
    create_area();
}

function create_area()
{
    let field_count_input = document.getElementById("field_count");
    let field_count = Number(field_count_input.value);
    let game_area = document.getElementById("game_area");

    delete_start_btn(start, field_count_input);

    current_player = "X";
    game_area.innerHTML = "";

    for(let i = 0; i < field_count; i++) {
        let tr = document.createElement('tr');
        game_area.appendChild(tr);

        for(let j = 0; j < field_count; j++) {
            let td = document.createElement('td');
            tr.appendChild(td);
        }
    }
    connect_td_events();
}
function connect_td_events(){
    let all_field = get_all_field();
    for(let i = 0; i < all_field.length; i++) {
        all_field[i].addEventListener("click", step);
    }
}
function step(){
    this.innerHTML = current_player;
    change_player();
    this.removeEventListener('click', step);
    check_winner();
}
function check_winner()
{
    let all_field = get_all_field();
    let field_count = Math.sqrt(all_field.length);

    if(check_winner_variant(get_horizontal_fields(all_field, field_count))) {
        alert(check_winner_variant(get_horizontal_fields(all_field, field_count)));
        create_area();
    }
    if(check_winner_variant(get_vertical_fields(all_field, field_count))) {
        alert(check_winner_variant(get_vertical_fields(all_field, field_count)));
        create_area();
    }
    if(check_winner_variant(get_l_dioganal_fields(all_field, field_count))) {
        alert(check_winner_variant(get_l_dioganal_fields(all_field, field_count)));
        create_area();
    }
    if(check_winner_variant(get_r_dioganal_fields(all_field, field_count))) {
        alert(check_winner_variant(get_r_dioganal_fields(all_field, field_count)));
        create_area();
    }
    if(check_draw(all_field)) {
        alert("Draw");
        create_area();
    }
}
function change_player(){
    if(current_player == "X") {
        current_player = "0";
    } else {
        current_player = "X";
    }
}
function get_all_field(){
    return document.getElementsByTagName("td");
}
function restart_game(){
    create_area();
}
function delete_start_btn(start_btn, field_input) {
    start_btn.style.display = 'none';
    field_input.style.display = 'none';
    restart_btn.style.display = 'block';
}
function get_horizontal_fields(arr, field_count){
    let horizontal = [];
    let row = [];
    for(let i = 0; i < field_count; i++) {
        for(let j = i * field_count; j < (i + 1) * field_count; j++) {
            row.push(arr[j].innerHTML);
        }
        horizontal.push(row);
        row = [];
    }

    return horizontal;
}

function check_winner_variant(winner_variant)
{
    let winner_player = false;

    for(let i = 0; i < winner_variant.length; i++) {
        for(let j = 0; j < winner_variant[i].length - 1; j++) {
            if(winner_variant[i][j] != winner_variant[i][j+1]) {
                winner_player = false
                break;
            }
            
            winner_player = winner_variant[i][j];
        }

        if(winner_player) {
            return winner_player;
        }
    }
}

function get_vertical_fields(arr, field_count)
{
    let vertical = [];

    for(let i = 0; i < field_count; i++) {
        let col = [];
        for(let j = i; j < field_count*field_count; j+=field_count) {
            col.push(arr[j].innerHTML);
        }
        vertical.push(col);
    }

    return vertical;
}

function get_l_dioganal_fields(arr, field_count)
{
    let dioganal = [];

    for(let i = 0; i < field_count; i++) {
        let current_dioganal = [];
        for(let j = i; j < field_count*field_count; j+=field_count + 1) {
            current_dioganal.push(arr[j].innerHTML);
        }
        if(current_dioganal.length == field_count) {
            dioganal.push(current_dioganal);
        }
    }
    return dioganal;
}

function get_r_dioganal_fields(arr, field_count)
{
    let revers_all_field = [];
    let row = [];
    
    for(let i = 0; i < field_count; i++) {
        for(let j = i * field_count; j < (i + 1) * field_count; j++) {
            row.push(arr[j]);
        }

        revers_all_field = revers_all_field.concat(row.reverse());
        row = [];
    }

    return get_l_dioganal_fields(revers_all_field, field_count);
}

function check_draw(arr)
{
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].innerHTML == "") {
            return false;
        }
    }
    return true;
}



