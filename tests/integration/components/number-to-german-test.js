import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('number-to-german', 'Integration | Component | number to german', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{number-to-german number=''}}`);
  assert.equal(this.$().text().trim(), '');
});

// words testing
test('it returns correct words for single digit numbers', function(assert) {
  this.render(hbs`{{number-to-german number=0}}`);
  assert.equal(this.$().text().trim(), 'null');

  this.render(hbs`{{number-to-german number=1}}`);
  assert.equal(this.$().text().trim(), 'eins');

  this.render(hbs`{{number-to-german number=5}}`);
  assert.equal(this.$().text().trim(), 'fünf');

  this.render(hbs`{{number-to-german number=9}}`);
  assert.equal(this.$().text().trim(), 'neun');
});

test('it returns correct words for double digit numbers', function(assert) {
  this.render(hbs`{{number-to-german number=10}}`);
  assert.equal(this.$().text().trim(), 'zehn');

  this.render(hbs`{{number-to-german number=11}}`);
  assert.equal(this.$().text().trim(), 'elf');

  this.render(hbs`{{number-to-german number=12}}`);
  assert.equal(this.$().text().trim(), 'zwölf');

  this.render(hbs`{{number-to-german number=16}}`);
  assert.equal(this.$().text().trim(), 'sechzehn');

  this.render(hbs`{{number-to-german number=17}}`);
  assert.equal(this.$().text().trim(), 'siebzehn');

  this.render(hbs`{{number-to-german number=21}}`);
  assert.equal(this.$().text().trim(), 'einundzwanzig');

  this.render(hbs`{{number-to-german number=53}}`);
  assert.equal(this.$().text().trim(), 'dreiundfünfzig');

  this.render(hbs`{{number-to-german number=70}}`);
  assert.equal(this.$().text().trim(), 'siebzig');
});

test('it returns correct words for three digit numbers', function(assert) {
  this.render(hbs`{{number-to-german number=100}}`);
  assert.equal(this.$().text().trim(), 'einhundert');

  this.render(hbs`{{number-to-german number=111}}`);
  assert.equal(this.$().text().trim(), 'einhundertelf');

  this.render(hbs`{{number-to-german number=346}}`);
  assert.equal(this.$().text().trim(), 'dreihundertsechsundvierzig');

  this.render(hbs`{{number-to-german number=672}}`);
  assert.equal(this.$().text().trim(), 'sechshundertzweiundsiebzig');

  this.render(hbs`{{number-to-german number=813}}`);
  assert.equal(this.$().text().trim(), 'achthundertdreizehn');

  this.render(hbs`{{number-to-german number=999}}`);
  assert.equal(this.$().text().trim(), 'neunhundertneunundneunzig');
});

test('it returns correct words for four digit numbers', function(assert) {
  this.render(hbs`{{number-to-german number=1000}}`);
  assert.equal(this.$().text().trim(), 'eintausend');

  this.render(hbs`{{number-to-german number=1456}}`);
  assert.equal(this.$().text().trim(), 'eintausendvierhundertsechsundfünfzig');

  this.render(hbs`{{number-to-german number=3902}}`);
  assert.equal(this.$().text().trim(), 'dreitausendneunhundertzwei');

  this.render(hbs`{{number-to-german number=1672}}`);
  assert.equal(this.$().text().trim(), 'eintausendsechshundertzweiundsiebzig');

  this.render(hbs`{{number-to-german number=9999}}`);
  assert.equal(this.$().text().trim(), 'neuntausendneunhundertneunundneunzig');
});

test('it returns correct words for five digit numbers', function(assert) {
  this.render(hbs`{{number-to-german number=10000}}`);
  assert.equal(this.$().text().trim(), 'zehntausend');

  this.render(hbs`{{number-to-german number=92345}}`);
  assert.equal(this.$().text().trim(), 'zweiundneunzigtausenddreihundertfünfundvierzig');
});

test('it returns correct words for six digit numbers', function(assert) {
  this.render(hbs`{{number-to-german number=100000}}`);
  assert.equal(this.$().text().trim(), 'einhunderttausend');

  this.render(hbs`{{number-to-german number=912345}}`);
  assert.equal(this.$().text().trim(), 'neunhundertzwölftausenddreihundertfünfundvierzig');
});

test('it returns correct words for seven digit numbers', function(assert) {
  this.render(hbs`{{number-to-german number=1000000}}`);
  assert.equal(this.$().text().trim(), 'eine Million');

  this.render(hbs`{{number-to-german number=9123456}}`);
  assert.equal(this.$().text().trim(), 'neun Millionen einhundertdreiundzwanzigtausendvierhundertsechsundfünfzig');
});

test('it returns correct words for ten digit numbers', function(assert) {
  this.render(hbs`{{number-to-german number='1000000000'}}`);
  assert.equal(this.$().text().trim(), 'eine Milliarde');

  this.render(hbs`{{number-to-german number='6123456000'}}`);
  assert.equal(this.$().text().trim(), 'sechs Milliarden einhundertdreiundzwanzig Millionen vierhundertsechsundfünfzigtausend');
});
