<template>
    <q-page class="page row justify-center">
      <div class="main_div">
        <q-table class="table"
          title="Pondelok-8:00"
          table-style="border-top: 3px solid #bbdefb"
          :rows="rows"
          :columns="columns"
          row-key="name"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          :separator="separator"
          :filter="filter"
          hide-bottom
          :no-data-label="$t('cantFindData')">
          <template #top-right>
            <div class="row">
              <q-space />
                <q-input class="q-ma-sm q-mr-md" outlined="" dense debounce="300" v-model="filter" placeholder="Search">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
            </div>
          </template>

          <template #body="props">
            <q-tr :class="(props.rowIndex%2)===0?'bg-blue-2':'bg-white'">
                <q-td key="name" :props="props">
                  {{ props.row.name }}
                </q-td>
                <q-td key="email" :props="props">
                  {{ props.row.email }}
                </q-td>
                <q-td auto-width>
                    <q-btn class="button items-center q-mr-xl">
                        {{ $t('chooseButton') }}
                    </q-btn>
                </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </q-page>
  </template>
  
  <script setup lang="ts">
    import { ref } from 'vue'

    const pagination=ref({rowsPerPage: 0});
    const filter = ref('');
    const separator = ref('none');


    const columns = [
      { 
        name: 'name',
        required: true, 
        label: 'Meno študenta',
        align: 'middle',
        field: 'name'
      },
      { 
        name: 'email', 
        required: true,
        label: 'Email',
        align: 'middle',
        field: 'email'
      }
    ]
  
    const rows = [
      {
        name: 'Usain Bolt',
        email: 'xbolt@is.stuba.sk'
      },
      {
        name: 'Mrkvička Jožko',
        email: 'xmrkvicka@is.stuba.sk'
      },
      {
        name: 'Tichá Hana',
        email: 'xticha@is.stuba.sk'
      },
      {
        name: 'Blanka Pretrhnutá',
        email: 'xpretrhnuta@is.stuba.sk'
      },
      {
        name: 'Usain Bolt',
        email: 'xbolt@is.stuba.sk'
      },
      {
        name: 'Mrkvička Jožko',
        email: 'xmrkvicka@is.stuba.sk'
      },
      {
        name: 'Tichá Hana',
        email: 'xticha@is.stuba.sk'
      },
      {
        name: 'Blanka Pretrhnutá',
        email: 'xpretrhnuta@is.stuba.sk'
      },
      {
        name: 'Usain Bolt',
        email: 'xbolt@is.stuba.sk'
      },
      {
        name: 'Mrkvička Jožko',
        email: 'xmrkvicka@is.stuba.sk'
      },
      {
        name: 'Tichá Hana',
        email: 'xticha@is.stuba.sk'
      },
      {
        name: 'Blanka Pretrhnutá',
        email: 'xpretrhnuta@is.stuba.sk'
      },
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

        .button {
            background-color: #083D77;
            color: white;
            border-radius: 10px;
        }
      }
    }
  </style>