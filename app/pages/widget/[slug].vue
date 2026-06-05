<template>
  <UCard>
    <template #header>
      <img
        :src="gameSkillLevelSVG"
        class="gameSkillLevelSVG"
        :alt="gameSkillLevel"
      />
      {{ elo }}
      |
      <Icon name="circle-flags:eu" /> {{ globalPosition }}
      |
      <Icon :name="flag" />
      {{ localPosition }}
    </template>
    <template #default> {{ kd }} K/D {{ kr }} K/R {{ avg }} AVG </template>
    <template #footer>
      <strong v-for="item in history" :key="item" :class="item">
        {{ item }}
      </strong>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});
const route = useRoute();
const nickname = route.params.slug;
const data = await $fetch(`/api/faceit/nickname?nickname=${nickname}`);
const flag = `circle-flags:${data.country}`;
const elo = data.games.cs2.faceit_elo;
const stats = await $fetch(`/api/faceit/stats20?playerId=${data.player_id}`);
let kdArray = [];
let krArray = [];
let avgArray = [];
let scoreArray = [];
for (const item of stats.items) {
  kdArray.push(parseFloat(item.stats["K/D Ratio"]));
  krArray.push(parseFloat(item.stats["K/R Ratio"]));
  avgArray.push(parseFloat(item.stats["Kills"]));
  if (
    parseInt(item.stats["Rounds"]) - parseInt(item.stats["Final Score"]) >
    parseInt(item.stats["Final Score"])
  ) {
    scoreArray.push("L");
  } else {
    scoreArray.push("W");
  }
}
const history = scoreArray.slice(0, 5).reverse().join(" ");
const kd = Math.f16round(sumArray(kdArray) / kdArray.length).toFixed(1);
const kr = Math.f16round(sumArray(krArray) / krArray.length).toFixed(1);
const avg = Math.f16round(sumArray(avgArray) / avgArray.length).toFixed(1);

const position = await $fetch(
  `/api/faceit/globalPosition?playerId=${data.player_id}`,
);
const globalPosition = position.position;
const locPosition = await $fetch(
  `/api/faceit/localPosition?playerId=${data.player_id}&country=${data.country}`,
);
const localPosition = locPosition.position;
const gameSkillLevel = data.games.cs2.skill_level;
const gameSkillLevelSVG = `https://faceit-widget.pages.dev/assets/icons/skill_level/skill_level_${gameSkillLevel}.svg`;

function sumArray(array) {
  let result = 0;
  for (const item of array) {
    result += item;
  }
  return result;
}
</script>

<style scoped>
.gameSkillLevelSVG {
  display: inline-block;
  width: 24px;
  height: 24px;
}
.W {
  color: greenyellow;
}
.L {
  color: red;
}
</style>
