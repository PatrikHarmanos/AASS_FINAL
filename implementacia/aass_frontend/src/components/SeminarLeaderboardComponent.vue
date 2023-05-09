<template>
    <q-page class="page row justify-center">
      <div class="main_div">
        <q-table class="table"
          :rows="rows"
          :columns="columns"
          row-key="name"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          :separator="separator"
          hide-bottom
          no-data-label="I can't find any data 😞">
          <template #body="props">
            <q-tr :class="(props.rowIndex%2)===0?'bg-blue-2':'bg-white'">
              <q-td 
                v-for="col in props.cols"
                :key="col.name">
                {{ col.value }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </q-page>
  </template>
  
  <script setup lang="ts">
    import { ref } from 'vue'

    const separator=ref('none');
    const pagination=ref({rowsPerPage: 0});

    const columns = [
      { 
        name: 'rank', 
        required: true, 
        label: 'Rank',
        style: 'max-width: 50px',
        headerStyle: 'max-width: 50px', 
        align: 'middle',
        field: 'rank',
        sortable: true
      },
      { 
        name: 'name',
        required: true, 
        label: 'Meno študenta', 
        align: 'middle',
        field: 'name'
      },
      { 
        name: 'task', 
        required: true,
        label: 'Dokončené úlohy',
        style: 'max-width: 80px',
        headerStyle: 'max-width: 80px',
        align: 'middle',
        field: 'task', 
        sortable: true 
      }
    ]
  
    const rows = [
      {
        rank: 1.,
        name: 'Usain Bolt',
        task: 5
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },{
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      },
      {
        rank: 2.,
        name: 'Blanka Pretrhnutá',
        task: 4
      }
    ]
  </script>
  
  <style scoped lang="scss">
    @import '../css/mixins.scss';
  
    .main_div {
      @include media-md-up {
        padding-top: 1%;
        padding-bottom: 5%;
        width: 70%;
      }
  
      @include media-sm-down {
          padding-top: 1%;
          padding-bottom: 2%;
          width: 100%;
        }    
  
      .table {
        box-shadow: 8px 8px 18px 10px rgba(216, 216, 216, 0.916);
        border-collapse: collapse;
        border-radius: 15px;
        border-style: solid; 
        border-width: thick;
        border-color: $blue-2;
        text-align: center;
      }
    }
  </style>