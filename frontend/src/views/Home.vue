<template lang="html">
  <div class="wrap">
    <div>

      <div class="photo">
        <img class="profilePhoto" alt="profile photo" src="../assets/valerie.png">
        <div class="text-overlay"><sui-icon size="med" name="star" /> 10500</div>
      </div>
          


      <div class="spacer" />
      <div class="emphasize">Ashley Louise &bull; 28</div>
    </div>

    <div class="spacer" />


    <div is="sui-button-group">
        <sui-button>Not Interested</sui-button>
        <sui-button-or text="or" />
        <sui-button color='red' icon="heart" label-position="right">Connect</sui-button>
    </div>
    <div class="half-spacer">Report this user</div>
    <div class="half-spacer" />

    <i>The full profile data is available once both parties connect.</i>
  </div>
</template>

<script>
export default {
  name: 'Homevue',
};
</script>