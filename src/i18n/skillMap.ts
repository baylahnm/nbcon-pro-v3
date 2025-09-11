import { SkillSlug } from '../domain/skills';

const map: Record<string, SkillSlug> = {
  'AutoCAD': 'autocad',
  'Revit': 'revit',
  'Project Management': 'project-management',
  'Structural Analysis': 'structural-analysis',
  'HVAC Design': 'hvac-design',
  'Energy Efficiency': 'energy-efficiency',
  'Building Systems': 'building-systems',
  '3D Modeling': '3d-modeling',
  'Safety Assessment': 'safety-assessment',
  'Building Codes': 'building-codes',
  'Seismic Design': 'seismic-design',
  'Power Systems': 'power-systems',
  'Lighting Design': 'lighting-design',
  'Smart Buildings': 'smart-buildings',
  'Renewable Energy': 'renewable-energy'
};

export const toSkillSlug = (label: string): SkillSlug | undefined =>
  map[label.trim()];


