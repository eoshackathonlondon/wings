<template lang="html">
  <div class="wrap">
    <div>
      <sui-card class="fluid">
          <img class="profilePhoto" alt="profile photo" src="../assets/valerie.png">
      </sui-card>

      <div class="spacer" />
      <div class="emphasize">Ashley Louise &bull; 28</div>
    </div>

    <div class="spacer" />


    <div is="sui-button-group">
        <sui-button>Not Interested</sui-button>
        <sui-button-or text="or" />
        <sui-button color='red' icon="heart" label-position="right">Connect</sui-button>
    </div>
    <div class="spacer" />

    <i>Private profile data is available once a connection is made.</i>
  </div>
</template>

<script>
export default {
  name: 'FluidCardExample',
};
</script>