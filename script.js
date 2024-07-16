document.addEventListener('DOMContentLoaded', function () {
    // Mostrar ventana de entrada al cargar la página
    const welcomeModal = document.getElementById('welcome-modal');
    const welcomeModalCloseBtn = document.getElementById('welcome-modal-close');

    if (welcomeModal && welcomeModalCloseBtn) {
        welcomeModal.style.display = 'block';
        welcomeModalCloseBtn.addEventListener('click', function () {
            welcomeModal.style.display = 'none';
        });
    }

    const limitReachedModal = document.getElementById('limit-reached-modal');
    const limitReachedModalCloseBtn = document.getElementById('limit-reached-modal-close');

    if (limitReachedModal && limitReachedModalCloseBtn) {
        limitReachedModalCloseBtn.addEventListener('click', function () {
            limitReachedModal.style.display = 'none';
        });
    }

    const errorModal = document.getElementById('error-modal');
    const errorModalCloseBtn = document.getElementById('error-modal-close');

    if (errorModal && errorModalCloseBtn) {
        errorModalCloseBtn.addEventListener('click', function () {
            errorModal.style.display = 'none';
        });

        window.addEventListener('click', function (event) {
            if (event.target == errorModal) {
                errorModal.style.display = 'none';
            }
        });
    }

    const successModal = document.getElementById('success-modal');
    const continueButton = document.getElementById('continue-button');
    const addMoreButton = document.getElementById('add-more-button');
    const felicitacionesModal = document.getElementById('felicitaciones-modal');
    const irPantalla1Button = document.getElementById('pantalla1-button');
    const irPantalla2Button = document.getElementById('pantalla2-button');

    if (successModal && continueButton && addMoreButton) {
        continueButton.addEventListener('click', function () {
            successModal.style.display = 'none';
            if (felicitacionesModal) {
                felicitacionesModal.style.display = 'block';
            }
        });

        addMoreButton.addEventListener('click', function () {
            successModal.style.display = 'none';
        });

        window.addEventListener('click', function (event) {
            if (event.target == successModal) {
                successModal.style.display = 'none';
            }
            if (event.target == felicitacionesModal) {
                felicitacionesModal.style.display = 'none';
            }
        });
    }

    if (felicitacionesModal && irPantalla1Button && irPantalla2Button) {
        irPantalla1Button.addEventListener('click', function () {
            window.location.href = 'index.html';
        });

        irPantalla2Button.addEventListener('click', function () {
            window.location.href = 'especializacion.html';
        });
    }

    // Manejar eventos para la pantalla 1
    const agregarBtnIndex = document.getElementById('agregar');
    const guardarContinuarBtn = document.getElementById('guardar-continuar');
    const borrarDatosBtn = document.getElementById('borrar-datos');
    const modalCloseBtn = document.getElementById('modal-close');

    if (agregarBtnIndex) {
        agregarBtnIndex.addEventListener('click', handleAddIndex);
    }

    if (guardarContinuarBtn) {
        guardarContinuarBtn.addEventListener('click', handleGuardarContinuar);
    }

    if (borrarDatosBtn) {
        borrarDatosBtn.addEventListener('click', handleBorrarDatos);
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', function () {
            const modal = document.getElementById('modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Cerrar modal de error al hacer clic fuera de él
    window.addEventListener('click', function (event) {
        if (errorModal && event.target == errorModal) {
            errorModal.style.display = 'none';
        }
        if (limitReachedModal && event.target == limitReachedModal) {
            limitReachedModal.style.display = 'none';
        }
    });

    // Añadir event listeners para eliminar la clase de error al cambiar los campos
    const requiredFieldsIndex = ['puesto', 'habilidad', 'competencia', 'desarrollos'];
    requiredFieldsIndex.forEach(function (fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('change', function () {
                if (field.value) {
                    field.classList.remove('select-error');
                } else {
                    field.classList.add('select-error');
                }
            });
        }
    });

    // Manejar eventos para la pantalla 2
    const agregarBtnSpecialization = document.getElementById('agregar-specialization');
    const confirmarBtnSpecialization = document.getElementById('confirmar-specialization');

    if (agregarBtnSpecialization) {
        agregarBtnSpecialization.addEventListener('click', handleAddSpecialization);
    }

    if (confirmarBtnSpecialization) {
        confirmarBtnSpecialization.addEventListener('click', function () {
            handleGuardarEspecializacion();
        });
    }

    // Cargar datos guardados al iniciar la página
    cargarDatosGuardados();
});

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = type;
    }
}

function handleAddIndex() {
    const puesto = document.getElementById('puesto');
    const habilidad = document.getElementById('habilidad');
    const competencia = document.getElementById('competencia');
    const desarrollos = document.getElementById('desarrollos');
    const adicional = document.getElementById('adicional');

    // Resetear bordes de error
    resetErrorStyles();

    let hasError = false;

    if (!puesto || !puesto.value) {
        if (puesto) puesto.classList.add('select-error');
        hasError = true;
    }
    if (!habilidad || !habilidad.value) {
        if (habilidad) habilidad.classList.add('select-error');
        hasError = true;
    }
    if (!competencia || !competencia.value) {
        if (competencia) competencia.classList.add('select-error');
        hasError = true;
    }
    if (!desarrollos || !desarrollos.value) {
        if (desarrollos) desarrollos.classList.add('select-error');
        hasError = true;
    }

    if (hasError) {
        mostrarErrorModal();
        return;
    }

    const filas = document.querySelectorAll('#registro-tabla tbody tr');
    const necesidadesPuesto = Array.from(filas).filter(fila => fila.cells[0].textContent === puesto.value).length;

    if (necesidadesPuesto >= 3) {
        mostrarLimitReachedModal();
        return;
    }

    const table = document.getElementById('registro-tabla').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).textContent = puesto.value;

    const selectCapacitacion = document.createElement('select');
    selectCapacitacion.classList.add('table-select');
    selectCapacitacion.innerHTML = `
        <option value="">Elegir</option>
        <option value="No requiere">No requiere</option>
        <option value="Si requiere">Si requiere</option>
    `;
    newRow.insertCell(1).appendChild(selectCapacitacion);

    newRow.insertCell(2).textContent = competencia.value;
    newRow.insertCell(3).textContent = habilidad.value;
    newRow.insertCell(4).textContent = desarrollos.value;

    const selectDominioActual = document.createElement('select');
    selectDominioActual.classList.add('table-select');
    selectDominioActual.innerHTML = `
        <option value="">Elegir</option>
        <option value="Insuficiente">Insuficiente</option>
        <option value="Regular">Regular</option>
        <option value="Bueno">Bueno</option>
        <option value="Óptimo">Óptimo</option>
    `;
    newRow.insertCell(5).appendChild(selectDominioActual);

    const selectDominioEsperado = document.createElement('select');
    selectDominioEsperado.classList.add('table-select');
    selectDominioEsperado.innerHTML = `
        <option value="">Elegir</option>
        <option value="Insuficiente">Insuficiente</option>
        <option value="Regular">Regular</option>
        <option value="Bueno">Bueno</option>
        <option value="Óptimo">Óptimo</option>
    `;
    newRow.insertCell(6).appendChild(selectDominioEsperado);

    const detallesAdicionalesCell = newRow.insertCell(7);
    detallesAdicionalesCell.textContent = adicional ? adicional.value : 'N/A';
    ajustarTamañoFuente(detallesAdicionalesCell, adicional ? adicional.value.length : 0);

    const selectImportancia = document.createElement('select');
    selectImportancia.classList.add('table-select');
    selectImportancia.innerHTML = `
        <option value="">Elegir</option>
        <option value="Importancia alta">Importancia alta</option>
        <option value="Importancia media">Importancia media</option>
        <option value="Importancia baja">Importancia baja</option>
    `;
    newRow.insertCell(8).appendChild(selectImportancia);

    const selectUrgencia = document.createElement('select');
    selectUrgencia.classList.add('table-select');
    selectUrgencia.innerHTML = `
        <option value="">Elegir</option>
        <option value="Urgente">Urgente</option>
        <option value="No urgente">No urgente</option>
    `;
    newRow.insertCell(9).appendChild(selectUrgencia);

    if (adicional) adicional.value = ''; // Clear the additional input field
    resetSelects(['puesto', 'competencia', 'habilidad', 'desarrollos']);
    showMessage('Elemento agregado a la tabla.', 'success');
    guardarDatos();
}

function handleAddSpecialization() {
    const puesto = document.getElementById('puesto');
    const areaConocimiento = document.getElementById('area-conocimiento');
    const conocimiento = document.getElementById('habilidad');
    const especificacion = document.getElementById('campo-escritura');

    // Resetear bordes de error
    resetErrorStyles();

    let hasError = false;

    if (!puesto.value) {
        puesto.classList.add('select-error');
        hasError = true;
    }
    if (!areaConocimiento.value) {
        areaConocimiento.classList.add('select-error');
        hasError = true;
    }
    if (!conocimiento.value) {
        conocimiento.classList.add('select-error');
        hasError = true;
    }

    if (hasError) {
        mostrarErrorModal();
        return;
    }

    const filas = document.querySelectorAll('#especializacion-tabla tbody tr');
    const necesidadesPuesto = Array.from(filas).filter(fila => fila.cells[0].textContent === puesto.value).length;

    if (necesidadesPuesto >= 3) {
        mostrarLimitReachedModal();
        return;
    }

    const table = document.getElementById('especializacion-tabla').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).textContent = puesto.value;
    newRow.insertCell(1).textContent = areaConocimiento.value;
    newRow.insertCell(2).textContent = conocimiento.value;

    const selectDominioActual = document.createElement('select');
    selectDominioActual.classList.add('table-select');
    selectDominioActual.innerHTML = `
        <option value="">Elegir</option>
        <option value="Insuficiente">Insuficiente</option>
        <option value="Regular">Regular</option>
        <option value="Bueno">Bueno</option>
        <option value="Óptimo">Óptimo</option>
    `;
    newRow.insertCell(3).appendChild(selectDominioActual);

    const selectDominioEsperado = document.createElement('select');
    selectDominioEsperado.classList.add('table-select');
    selectDominioEsperado.innerHTML = `
        <option value="">Elegir</option>
        <option value="Insuficiente">Insuficiente</option>
        <option value="Regular">Regular</option>
        <option value="Bueno">Bueno</option>
        <option value="Óptimo">Óptimo</option>
    `;
    newRow.insertCell(4).appendChild(selectDominioEsperado);

    const detallesAdicionalesCell = newRow.insertCell(5);
    detallesAdicionalesCell.textContent = especificacion.value || 'N/A';
    ajustarTamañoFuente(detallesAdicionalesCell, especificacion.value.length);

    const selectImportancia = document.createElement('select');
    selectImportancia.classList.add('table-select');
    selectImportancia.innerHTML = `
        <option value="">Elegir</option>
        <option value="Importancia alta">Importancia alta</option>
        <option value="Importancia media">Importancia media</option>
        <option value="Importancia baja">Importancia baja</option>
    `;
    newRow.insertCell(6).appendChild(selectImportancia);

    const selectUrgencia = document.createElement('select');
    selectUrgencia.classList.add('table-select');
    selectUrgencia.innerHTML = `
        <option value="">Elegir</option>
        <option value="Urgente">Urgente</option>
        <option value="No urgente">No urgente</option>
    `;
    newRow.insertCell(7).appendChild(selectUrgencia);

    const selectEspecialista = document.createElement('select');
    selectEspecialista.classList.add('table-select');
    selectEspecialista.innerHTML = `
        <option value="">Elegir</option>
        <option value="Si">Si</option>
        <option value="No">No</option>
    `;
    newRow.insertCell(8).appendChild(selectEspecialista);

    const inputNombreEspecialista = document.createElement('input');
    inputNombreEspecialista.type = 'text';
    inputNombreEspecialista.disabled = true;
    newRow.insertCell(9).appendChild(inputNombreEspecialista);

    selectEspecialista.addEventListener('change', function () {
        inputNombreEspecialista.disabled = this.value !== 'Si';
        if (inputNombreEspecialista.disabled) {
            inputNombreEspecialista.value = '';
        }
    });

    resetSelects(['puesto', 'area-conocimiento', 'habilidad']);
    showMessage('Elemento agregado a la tabla.', 'success');
    guardarDatos();
}

function handleGuardarContinuar() {
    const filas = document.querySelectorAll('#registro-tabla tbody tr');
    let hasError = false;

    filas.forEach(row => {
        const selects = row.querySelectorAll('select');
        selects.forEach(select => {
            if (select.value === '') {
                select.classList.add('select-error');
                hasError = true;
            } else {
                select.classList.remove('select-error');
            }
        });
    });

    if (hasError) {
        mostrarErrorModal();
    } else {
        window.location.href = 'especializacion.html';
    }
}

function handleGuardarEspecializacion() {
    const filas = document.querySelectorAll('#especializacion-tabla tbody tr');
    let hasError = false;

    filas.forEach(row => {
        const selects = row.querySelectorAll('select');
        selects.forEach(select => {
            if (select.value === '') {
                select.classList.add('select-error');
                hasError = true;
            } else {
                select.classList.remove('select-error');
            }
        });
    });

    if (hasError) {
        mostrarErrorModal();
    } else {
        const successModal = document.getElementById('success-modal');
        if (successModal) {
            successModal.style.display = 'block';
        }
    }
}

function handleBorrarDatos() {
    const tableBody = document.querySelector('#registro-tabla tbody');
    tableBody.innerHTML = '';
    showMessage('Todos los datos han sido borrados.', 'success');
    localStorage.removeItem('tablaDatos');
}

function ajustarTamañoFuente(cell, length) {
    if (length <= 10) {
        cell.classList.add('short-text');
    } else if (length <= 20) {
        cell.classList.add('medium-text');
    } else {
        cell.classList.add('long-text');
    }
    cell.classList.add('detalles-adicionales');
}

function mostrarErrorModal() {
    const errorModal = document.getElementById('error-modal');
    if (errorModal) {
        errorModal.style.display = 'block';
    }
}

function mostrarLimitReachedModal() {
    const limitReachedModal = document.getElementById('limit-reached-modal');
    if (limitReachedModal) {
        limitReachedModal.style.display = 'block';
    }
}

function resetErrorStyles() {
    const fields = document.querySelectorAll('.select-error');
    fields.forEach(function (field) {
        field.classList.remove('select-error');
    });
}

function resetSelects(fieldsToReset) {
    fieldsToReset.forEach(function (fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.value = "";
        }
    });
}

function guardarDatos() {
    const tablaDatos = [];
    const filas = document.querySelectorAll('#registro-tabla tbody tr');

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        const filaDatos = [];
        celdas.forEach(celda => {
            if (celda.querySelector('select')) {
                filaDatos.push(celda.querySelector('select').value);
            } else {
                filaDatos.push(celda.textContent);
            }
        });
        tablaDatos.push(filaDatos);
    });

    localStorage.setItem('tablaDatos', JSON.stringify(tablaDatos));
}

function cargarDatosGuardados() {
    const tablaDatos = JSON.parse(localStorage.getItem('tablaDatos')) || [];
    const tableBody = document.querySelector('#registro-tabla tbody');

    tablaDatos.forEach(filaDatos => {
        const newRow = tableBody.insertRow();
        filaDatos.forEach(dato => {
            const newCell = newRow.insertCell();
            if (newCell.cellIndex === 1 || newCell.cellIndex === 5 || newCell.cellIndex === 6 || newCell.cellIndex === 8 || newCell.cellIndex === 9) {
                const select = document.createElement('select');
                select.classList.add('table-select');
                select.innerHTML = getOptionsForCell(newCell.cellIndex);
                select.value = dato;
                newCell.appendChild(select);
            } else {
                newCell.textContent = dato;
            }
        });
    });
}

function getOptionsForCell(cellIndex) {
    switch (cellIndex) {
        case 1:
            return `
                <option value="">Elegir</option>
                <option value="No requiere">No requiere</option>
                <option value="Si requiere">Si requiere</option>
            `;
        case 5:
        case 6:
            return `
                <option value="">Elegir</option>
                <option value="Insuficiente">Insuficiente</option>
                <option value="Regular">Regular</option>
                <option value="Bueno">Bueno</option>
                <option value="Óptimo">Óptimo</option>
            `;
        case 8:
            return `
                <option value="">Elegir</option>
                <option value="Importancia alta">Importancia alta</option>
                <option value="Importancia media">Importancia media</option>
                <option value="Importancia baja">Importancia baja</option>
            `;
        case 9:
            return `
                <option value="">Elegir</option>
                <option value="Urgente">Urgente</option>
                <option value="No urgente">No urgente</option>
            `;
        default:
            return '';
    }
}
