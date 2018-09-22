<template lang="html">
    <div class="wrap alignLeft">

  
        <h3>Your Name</h3>
        <sui-input class="fullwidth" value="Ashley Louise" />

        <h3>Current Age</h3>
        <sui-dropdown class="fullwidth"
            placeholder="Select Age"
            selection
            :options="options"
            v-model="current"
        />

        <h3>Private Profile</h3>
        The private profile is only exposed when both parties connect.
        <div class="half-spacer" />
        <textarea rows="7" style="border:1px solid #ccc; width:100%">I'm super glad we both decided to connect. My phone number is 044-245-123-9812, give me a call sometime soon. :)
        </textarea>

    </div>
</template>

<script>
export default {
  name: 'SelectionExample',
  data() {
    return {
      current: 28,
      options: [...Array(100).keys()].map(function(i) {
        return {
            text: 18+i,
            value:18+i,
        } 
        })
    };
  },
};
</script>