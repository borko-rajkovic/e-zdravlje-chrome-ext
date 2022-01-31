const createElementFromHTML = (htmlString) => {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
};

const createTableRowFromHTML = (htmlString) => {
  const tr = document.createElement("tr");
  tr.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return tr;
};

const defaultOptionSelectList = `"<option selected value=0>Izaberite...</option>"`;

const templateSelectList = `
<div class="ezdravlje-chrome-ext__ime_korisnika">
    <!-- Select -->
    <div class="input-group mb-3">
        <select class="custom-select" id="userList">
            <option selected value=0>Izaberite...</option>
        </select>
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" aria-haspopup="true" aria-expanded="false"
                data-toggle="modal" data-target="#exampleModal">
                <i class="fas fa-users-cog"></i>
            </button>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Podešavanja</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Ime</th>
                                <th scope="col">Nalog</th>
                                <th scope="col">PIN</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody id="usersTableBody">
                        </tbody>
                    </table>
                    <div class="form-check">
                        <input id="configRememberNewLogins" class="form-check-input" type="checkbox" value="" id="rememberNewCheck">
                        <label class="form-check-label" for="rememberNewCheck">
                            Pamti nove login-ove
                        </label>
                    </div>
                    <div class="form-check">
                        <input id="configRememberPINs" class="form-check-input" type="checkbox" value="" id="rememberPINCheck" disabled>
                        <label class="form-check-label" for="rememberPINCheck">
                            Pamti PIN-ove
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="deleteAllUsers" type="button" class="btn btn-danger">Obriši sve</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
                </div>
            </div>
        </div>
    </div>
</div>
`;

const templateOption = (value, desc) =>
  `<option value=${value}>${desc}</option>`;

const templateTableRow = (number, name, username, PIN) =>
  `
    <th scope="row">${number}</th>
    <td>${name}</td>
    <td class="users-table__username" >${username}</td>
    <td>
        <span>${PIN}</span>
        ${
          PIN
            ? `
        <button class="btn btn-danger btn-sm float-right users-table__remove-password" type="button">
            <i class="fas fa-minus-circle"></i>
        </button>
        <button class="btn btn-outline-primary btn-sm float-right mr-2 users-table__eye-toggle" type="button">
            <i class="far fa-eye-slash"></i>
        </button>
        `
            : ""
        }
    </td>
    <td>
        <button class="btn btn-danger btn-sm float-right users-table__remove-user" type="button">
            <i class="fas fa-trash"></i>
        </button>
    </td>
`;

const templateAlertEmptyUserList = `
<div class="alert alert-primary alert-dismissible fade show" role="alert">
  Nakon prve prijave, korisnik će biti prikazan u listi
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
`;
