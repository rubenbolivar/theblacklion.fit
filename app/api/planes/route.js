import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// GET - Obtener todos los planes activos (público)
export async function GET() {
  try {
    const planes = await prisma.plan.findMany({
      where: { activo: true },
      orderBy: { orden: 'asc' }
    });

    return NextResponse.json(planes);
  } catch (error) {
    console.error('Error fetching planes:', error);
    return NextResponse.json(
      { error: 'Error al obtener los planes' },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo plan (protegido)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const data = await request.json();

    const plan = await prisma.plan.create({
      data: {
        nombre: data.nombre,
        precio: parseFloat(data.precio),
        duracionMeses: parseInt(data.duracionMeses),
        descripcion: data.descripcion,
        caracteristicas: data.caracteristicas,
        destacado: data.destacado || false,
        activo: data.activo !== undefined ? data.activo : true,
        terminosCondiciones: data.terminosCondiciones,
        orden: data.orden || 0
      }
    });

    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error('Error creating plan:', error);
    return NextResponse.json(
      { error: 'Error al crear el plan' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar plan (protegido)
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'ID del plan es requerido' },
        { status: 400 }
      );
    }

    const plan = await prisma.plan.update({
      where: { id },
      data: {
        ...updateData,
        precio: updateData.precio ? parseFloat(updateData.precio) : undefined,
        duracionMeses: updateData.duracionMeses ? parseInt(updateData.duracionMeses) : undefined,
      }
    });

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error updating plan:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el plan' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar plan (protegido)
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID del plan es requerido' },
        { status: 400 }
      );
    }

    await prisma.plan.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Plan eliminado exitosamente' });
  } catch (error) {
    console.error('Error deleting plan:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el plan' },
      { status: 500 }
    );
  }
}