import EditarPersonalForm from '@/components/admin/personal/EditarPersonalForm';

export default function EditarPersonalPage({ params }: { params: { id: string } }) {
    const { id } = params;

    return (
        <EditarPersonalForm id={id} />
    );
}
