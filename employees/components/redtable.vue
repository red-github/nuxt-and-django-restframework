<template>
    <tr>
        <td>{{items.name}} </td>
        <td>{{items.age}} </td>
        <td>{{items.address}} </td>
        <td>
            <button @click="onView(items.id)" class="btn btn-sm btn-primary">View</button>
            <button @click="onDelete(items.id)" class="btn btn-sm btn-danger">Delete</button>
        </td>
    </tr>
</template>
<script>
export default {
    props: ["items", "onView", "onDelete"]
}
</script>