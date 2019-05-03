<template>
  <div class="fire-event">
    <button @click="fireEvent">FIRE EVENT</button>
  </div>
</template>

<script>
export default {
  methods: {
    async fireEvent() {
        const url = 'http://htkwikqi6gnwn.a.pipek.it/';
        const request = new Request(url);
        const headers = new Headers();
        const body = {
            event: 'test'
        };
        headers.append('Content-Type', 'application/json');
        const params = {
            method: 'POST',
            headers,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(body)
        }
        const response = await fetch(
            request,
            params
        );
        const resp = await response;
    }
  }
}
</script>