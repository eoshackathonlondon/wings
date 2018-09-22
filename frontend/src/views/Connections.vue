<template lang="html">
    <div class="wrap alignLeft">

        <sui-table celled padded>
        
            <sui-table-body>
            <sui-table-row>
                <sui-table-cell>
                    <img class="profilePhotoConnected" alt="profile photo" src="../assets/valerie.png">
                </sui-table-cell>
                <sui-table-cell single-line><h3>
                    Ashley Louise &bull; 28 &nbsp; &nbsp; &nbsp; <sui-rating icon="star" :rating="1" :max-rating="1" /> 10500
                </h3></sui-table-cell>
                <sui-table-cell>
                Creatine supplementation is the reference compound for increasing
                muscular creatine levels; there is variability in this increase,
                however, with some nonresponders.
                </sui-table-cell>  
            </sui-table-row>
            <sui-table-row>     
                <sui-table-cell>
                    <img class="profilePhotoConnected" alt="profile photo" src="../assets/erica.png">
                </sui-table-cell>
                <sui-table-cell single-line><h3>
                        Erica Caufield &bull; 23 &nbsp; &nbsp; &nbsp; <sui-rating icon="star" :rating="1" :max-rating="1" /> 900
                </h3></sui-table-cell>
                <sui-table-cell>
                Creatine supplementation is the reference compound for increasing
                muscular creatine levels; there is variability in this increase,
                however, with some nonresponders.
                </sui-table-cell>
            </sui-table-row>
            <sui-table-row>     
            <sui-table-cell>
                    <img class="profilePhotoConnected" alt="profile photo" src="../assets/susan.png">
                </sui-table-cell>
                <sui-table-cell single-line><h3>
                        Susan Barnes &bull; 31 &nbsp; &nbsp; &nbsp; <sui-rating icon="star" :rating="1" :max-rating="1" /> 125
                </h3></sui-table-cell>
                <sui-table-cell>
                Creatine supplementation is the reference compound for increasing
                muscular creatine levels; there is variability in this increase,
                however, with some nonresponders.
                </sui-table-cell>
            </sui-table-row>            

            </sui-table-body>
        </sui-table>
    </div>
</template>
      
<script>
    export default {
    name: 'TableRatingExample',
    };
</script>