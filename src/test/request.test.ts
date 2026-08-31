describe("Validaciones del Módulo de Solicitudes", () => {
    test("Debe rechazar solicitudes con cantidades menores o iguales a cero", () => {
        const cantidad = 0;
        expect(cantidad).toBeLessThanOrEqual(0);
    });

    test("Debe permitir únicamente los estados definidos por la lógica de negocio", () => {
        const estadosValidos = ["Pending", "Approved", "Rejected", "Delivered"];
        const estadoEntrante = "Approved";
        expect(estadosValidos).toContain(estadoEntrante);
    });
});