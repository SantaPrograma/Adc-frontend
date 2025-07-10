import EditarProductoForm from "@/components/admin/inventario/EditarProductoForm";

export default function EditarProductoPage({ params }: { params: { id: string } }) {
    const { id } = params;

    return (
        <EditarProductoForm id={id} />
    );
}
