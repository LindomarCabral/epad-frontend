<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        :title="title"
        :data="data"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode=='grid'"
        :filter="filter"
        :pagination.sync="pagination"
      >
        <template v-slot:top-right="props">
          <q-btn @click="new_user=true ; acao = 'new'; user = {} " outline color="primary" label="Novo Usuário" class="q-mr-xs"/>

          <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'"
          >
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
            </q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
            v-if="!props.inFullscreen"
          >
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{mode==='grid' ? 'List' : 'Grid'}}
            </q-tooltip>
          </q-btn>

          <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
          />
        </template>        

        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn dense color="primary" icon="edit" @click="loadUser(props.row.id)"/>
              <q-btn dense color="red" icon="delete" @click="remove(props.row.id)"/>             
            </div>
          </q-td>
        </template>

      </q-table>
    </q-card>

      <q-dialog v-model="new_user">
      <q-card style="width: 600px; max-width: 60vw;">
        <q-card-section>
          <div class="text-h6">
            Adicionar Novo Usuário
            <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
          </div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Nome</q-item-label>
                  <q-input dense outlined v-model="user.username" label="Nome"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section v-if="acao === 'new'">
                  <q-item-label class="q-pb-xs">E-mail</q-item-label>
                  <q-input dense outlined v-model="user.email" label="e-mail"/>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">CPF</q-item-label>
                  <q-input dense outlined v-model="user.cpf" label="cpf"/>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs" type="pass">Senha</q-item-label>
                  <q-input dense outlined v-model="user.password" label="senha" type="password"/>
                </q-item-section>
              </q-item>

            </q-list>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-teal">

          <q-btn label="Salvar" type="submit" color="primary" v-if="acao === 'new'" @click="save" v-close-popup/>
          <q-btn label="Alterar" type="submit" color="primary" v-else @click="alterar" v-close-popup/>

        </q-card-actions>

      </q-card>
    </q-dialog>

    

  </q-page>
</template>

<script>
    import {exportFile} from "quasar";
    import axios from 'axios'

    function wrapCsvValue(val, formatFn) {
        let formatted = formatFn !== void 0 ? formatFn(val) : val;

        formatted =
            formatted === void 0 || formatted === null ? "" : String(formatted);

        formatted = formatted.split('"').join('""');

        return `"${formatted}"`;
    }

    export default {
        data() {
            return {
                filter: "",
                user: {},
                new_user: false,
                mode: "list",
                acao: "",
                invoice: {},
                employee_dialog: false,
                title:"Usuários",
                columns: [
                    {
                        name: "ID",
                        align: "left",
                        label: "ID",
                        field: "id",
                        sortable: true
                    },
                    {
                        name: "username",
                        align: "left",
                        label: "Nome",
                        field: "username",
                        sortable: true
                    },
                    {
                        name: "cpf",
                        required: true,
                        label: "CPF",
                        align: "left",
                        field: "cpf",
                        sortable: true
                    },                    
                    {
                        name: "email",
                        align: "left",
                        label: "E-mail",
                        field: "email",
                        sortable: true
                    },
                    
                    {
                        name: "action",
                        align: "left",
                        label: "Ação",
                        field: "action",
                        sortable: true
                    }
                ],
                data: [],
                pagination: {
                    rowsPerPage: 10
                }
            };
        },
        mounted () {          
          this.getUsers()
        },
        methods: {
            exportTable() {
                // naive encoding to csv format
                const content = [this.columns.map(col => wrapCsvValue(col.label))]
                    .concat(
                        this.data.map(row =>
                            this.columns
                                .map(col =>
                                    wrapCsvValue(
                                        typeof col.field === "function"
                                            ? col.field(row)
                                            : row[col.field === void 0 ? col.name : col.field],
                                        col.format
                                    )
                                )
                                .join(",")
                        )
                    )
                    .join("\r\n");

                const status = exportFile("quotes.csv", content, "text/csv");

                if (status !== true) {
                    this.$q.notify({
                        message: "Browser denied file download...",
                        color: "negative",
                        icon: "warning"
                    });
                }
            },
            async getUsers() {
                axios.get('admin/users')
                .then(response => {                                    
                    this.data = response.data.data         
                }).catch(error => {
                    console.log(error)
                })
            },
            save(){             
              axios.post('admin/users', this.user)
              .then(response => {                    
                    this.getUsers()                                              
                }).catch(error => {
                    console.log(error)
                })
            },
            loadUser(id){
               axios.get(`admin/users/${id}`)
              .then(response => {                 
                  this.user = response.data
                  this.new_user = true
                  this.acao = 'update'
              }).catch(error => {
                  console.log(error)
              })
            },
            alterar(){             
               const id = this.user.id 
               console.log('USER:', user)      
               axios.put(`admin/users/${id}`, this.user)
              .then(response => {                     
                    this.getUsers()                                              
                }).catch(error => {
                    console.log(error)
                })
            },
            remove(id){             
              axios.delete(`admin/users/${id}`)
              .then(response => {
                  this.getUsers() 
              }).catch(error => {
                  console.log(error)
              })
            }
        }
    };
</script>
<style>
  .q-chip__content {
    display: block;
    text-align: center;
  }
</style>
