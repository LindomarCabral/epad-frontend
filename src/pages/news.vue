<template>
    <q-page class="flex flex-center column q-mt-md animate-fade">
        <div>
          NEWS
        </div>

        <!--Loading Animation-->
        <inner-loading :loading="loading"/>
    </q-page>
</template>

<script>
  import InnerLoading from '../components/InnerLoading'
  import {openURL} from 'quasar'

  export default {
    name: 'News',
    components: {
      InnerLoading
    },
    data () {
      return {
        loading: false,
        articles: []
      }
    },
    
    methods: {
       openURL
    }
  }

</script>

<style lang="stylus" scoped>
</style>
