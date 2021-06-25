"""empty message

Revision ID: 31ec76a2a5fb
Revises: 
Create Date: 2021-06-24 12:31:06.599532

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '31ec76a2a5fb'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('securities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ticker', sa.String(length=10), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('ticker')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('user_securities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('relation', sa.String(length=30), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('security_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['security_id'], ['securities.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_securities')
    op.drop_table('users')
    op.drop_table('securities')
    # ### end Alembic commands ###