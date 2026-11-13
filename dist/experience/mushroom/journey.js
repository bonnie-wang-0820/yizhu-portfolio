export const emotions=[
  {name:'焦虑',gesture:'竖起大拇指',line:'如果你感到焦虑，请竖起大拇指，召唤属于你的蘑菇。'},
  {name:'孤独',gesture:'张开五指',line:'如果你感到孤独，请张开五指，让它看见你。'},
  {name:'沮丧',gesture:'大拇指朝下',line:'如果你感到沮丧，请将大拇指朝下，它会接住你的低落。'},
  {name:'愤怒',gesture:'收拢握拳',line:'如果你感到愤怒，请握紧拳头，召唤承接怒气的蘑菇。'}
];
export class Journey {
  constructor(onChange){this.onChange=onChange;this.reset();}
  reset(){this.phase='choose';this.id=null;this.charge=0;this.elapsed=0;this.onChange?.(this);}
  summon(id){if(!['choose','speak'].includes(this.phase))return false;this.id=id;this.phase='speak';this.charge=0;this.elapsed=0;this.onChange?.(this);return true;}
  update(dt,volume,threshold,remaining){this.elapsed+=dt;if(this.phase==='speak'){this.charge=volume>=threshold?Math.min(1.2,this.charge+dt):Math.max(0,this.charge-dt*.7);if(this.charge>=1.2)this.go('bloom');}else if(this.phase==='bloom'&&this.elapsed>=2.6)this.go('clear');else if(this.phase==='clear'&&remaining<.025)this.go('farewell');else if(this.phase==='farewell'&&this.elapsed>=1.8)this.go('done');}
  go(phase){this.phase=phase;this.elapsed=0;this.onChange?.(this);}
  get locked(){return !['choose','speak'].includes(this.phase);}
}
