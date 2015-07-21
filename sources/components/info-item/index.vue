<template>
  <div class="info-item">
    <div class="label" style="background: {{labelBackground}}">{{label}}</div>
    <div class="value">
      <ul>
        <li v-repeat="value">
          <partial name="{{template}}"></partial>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
  .info-item {
    display: box;
    display: -webkit-box;
  }

  .info-item + .info-item {
    border-top: 1px solid #d7dbdc;
  }

  .info-item .label {
    padding: 0.8rem;
    width: 35%;
  }

  .info-item .value {
    background-color: #f5f4ef;
    box-flex: 1;
    -webkit-box-flex: 1;
    padding: 0.8rem;
    word-wrap: break-word;
  }

  .info-item .value ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>

<script lang="babel">
  export default {
    props: [
      'labelBackground',
      'label',
      'value',
    ],
    partials: {
      'text':
        '{{$value}}',
      'link':
        '<a href="{{$value}}" target="_blank">{{$value}}</a>',
      'image':
        '<a href="{{$value}}" target="_blank">' +
          '<img src="{{$value}}" width="160" alt="">' +
          '<span>{{$value}}</span>' +
        '</a>',
    }
  }
</script>
